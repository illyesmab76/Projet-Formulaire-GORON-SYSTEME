from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from PyPDF2 import PdfWriter, PdfReader
import io
import base64

@api_view(['POST'])
def generate_pdf_remise(request):
    print("🔥 DJANGO : Requête reçue !")
    
    try:
        data = request.data
        
        # ===== 1. CRÉER LE PDF PRINCIPAL =====
        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        
        # Titre
        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawString(2*cm, height - 2*cm, "Fiche de Remise Informatique")
        
        # Infos générales
        pdf.setFont("Helvetica", 12)
        y = height - 4*cm
        pdf.drawString(2*cm, y, f"N° Affaire: {data.get('numAffaire', 'N/A')}")
        y -= 0.7*cm
        pdf.drawString(2*cm, y, f"Site: {data.get('site', 'N/A')}")
        y -= 0.7*cm
        pdf.drawString(2*cm, y, f"Date: {data.get('date', 'N/A')}")
        y -= 0.7*cm
        pdf.drawString(2*cm, y, f"Type: {data.get('typeMateriel', 'N/A')}")
        
        # Admin
        y -= 1.5*cm
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(2*cm, y, "Identifiant Administrateur")
        y -= 0.8*cm
        pdf.setFont("Helvetica", 11)
        pdf.drawString(2*cm, y, "Utilisateur: Administrateur")
        y -= 0.6*cm
        pdf.drawString(2*cm, y, f"Mot de passe: {data.get('passwordGenere', 'N/A')}")
        
        # Équipements
        y -= 1.5*cm
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(2*cm, y, "Équipements")
        y -= 0.8*cm
        pdf.setFont("Helvetica", 10)
        
        for eq in data.get('equipements', []):
            if y < 3*cm:
                pdf.showPage()
                y = height - 2*cm
            
            nb_fichiers = len(eq.get('fichiers', []))
            pdf.drawString(2.5*cm, y, f"• {eq.get('f1', 'N/A')} - Modèle: {eq.get('f2', 'N/A')}")
            y -= 0.5*cm
            pdf.drawString(3*cm, y, f"S/N: {eq.get('f3', 'N/A')} | Garantie: {eq.get('garantie', 'N/A')}")
            y -= 0.5*cm
            
            if nb_fichiers > 0:
                pdf.setFont("Helvetica-Oblique", 9)
                pdf.drawString(3*cm, y, f"📎 {nb_fichiers} pièce(s) jointe(s) - Voir panneau 'Pièces jointes' du PDF")
                pdf.setFont("Helvetica", 10)
            
            y -= 0.8*cm
        
        pdf.save()
        buffer.seek(0)
        
        # ===== 2. EMBARQUER LES PIÈCES JOINTES =====
        writer = PdfWriter()
        reader = PdfReader(buffer)
        
        # Ajouter toutes les pages du PDF
        for page in reader.pages:
            writer.add_page(page)
        
        # Collecter tous les fichiers
        print("📎 DJANGO : Attachement des fichiers...")
        fichiers_count = 0
        
        for eq in data.get('equipements', []):
            for fichier in eq.get('fichiers', []):
                try:
                    # Décoder le base64
                    file_data = base64.b64decode(fichier['data'])
                    
                    # Attacher au PDF
                    writer.add_attachment(
                        filename=fichier['name'],
                        data=file_data
                    )
                    fichiers_count += 1
                    print(f"  ✅ Attaché : {fichier['name']}")
                except Exception as e:
                    print(f"  ❌ Erreur fichier {fichier.get('name', '?')} : {e}")
        
        for comp in data.get('composants', []):
            for fichier in comp.get('fichiers', []):
                try:
                    file_data = base64.b64decode(fichier['data'])
                    writer.add_attachment(filename=fichier['name'], data=file_data)
                    fichiers_count += 1
                    print(f"  ✅ Attaché : {fichier['name']}")
                except Exception as e:
                    print(f"  ❌ Erreur fichier {fichier.get('name', '?')} : {e}")
        
        for lic in data.get('licences', []):
            for fichier in lic.get('fichiers', []):
                try:
                    file_data = base64.b64decode(fichier['data'])
                    writer.add_attachment(filename=fichier['name'], data=file_data)
                    fichiers_count += 1
                    print(f"  ✅ Attaché : {fichier['name']}")
                except Exception as e:
                    print(f"  ❌ Erreur fichier {fichier.get('name', '?')} : {e}")
        
        # ===== 3. SAUVEGARDER LE PDF FINAL =====
        output = io.BytesIO()
        writer.write(output)
        output.seek(0)
        
        print(f"✅ DJANGO : PDF généré avec {fichiers_count} pièce(s) jointe(s)")
        
        return FileResponse(
            output, 
            as_attachment=True, 
            filename=f"Remise_{data.get('numAffaire', 'Client')}_AVEC_PJ.pdf"
        )
        
    except Exception as e:
        print("❌ DJANGO : Erreur -", str(e))
        import traceback
        traceback.print_exc()
        return Response({'success': False, 'error': str(e)}, status=400)