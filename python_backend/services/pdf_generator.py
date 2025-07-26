from fpdf import FPDF
import os

EXPORT_DIR = "static/exports"
os.makedirs(EXPORT_DIR, exist_ok=True)

def generate_pdf(summary: str) -> str:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    for line in summary.split('\n'):
        pdf.multi_cell(0, 10, line)

    filename = "summary.pdf"
    filepath = os.path.join(EXPORT_DIR, filename)
    pdf.output(filepath)
    return f"/{EXPORT_DIR}/{filename}"