from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
import io

@api_view(['POST'])
def generate_pdf_remise(request):
    print("🔥 DJANGO : Requête reçue !")
    print("📦 Données :", request.data)

    try:
        data = request.data
        
        # Créer le PDF
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
            pdf.drawString(2.5*cm, y, f"• {eq.get('f1', 'N/A')} - Modèle: {eq.get('f2', 'N/A')}")
            y -= 0.5*cm
            pdf.drawString(3*cm, y, f"S/N: {eq.get('f3', 'N/A')} | Garantie: {eq.get('garantie', 'N/A')}")
            y -= 0.8*cm
        
        pdf.save()
        buffer.seek(0)
        
        print("✅ DJANGO : PDF généré avec succès")
        return FileResponse(buffer, as_attachment=True, filename='remise_DJANGO.pdf')
        
    except Exception as e:
        print("❌ DJANGO : Erreur -", str(e))
        return Response({'success': False, 'error': str(e)}, status=400)