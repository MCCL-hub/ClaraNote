def summarize_text(text: str) -> str:
    # Version simplifiée (sans modèle NLP pour MVP)
    return f"""
Participants : À définir
Thèmes abordés : Extrait des sujets évoqués
Décisions prises : À synthétiser
Actions à suivre : À planifier

Résumé :
{text[:1000]}...
"""