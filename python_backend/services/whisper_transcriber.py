def transcribe_audio(path: str) -> str:
    # Mock transcription for MVP - in production, integrate with OpenAI Whisper API or similar service
    return """Bonjour et bienvenue à cette réunion d'équipe. Aujourd'hui nous allons discuter de l'avancement du projet ClaraNote. Marie va nous présenter les derniers développements concernant l'interface utilisateur. 

Thomas, peux-tu nous faire un point sur les tests de performance ? Les résultats semblent prometteurs selon le rapport que tu as envoyé hier.

Sophie, pour la documentation utilisateur, où en sommes-nous ? Il faudrait que ce soit prêt pour la semaine prochaine avant le lancement de la version bêta.

Nous devons également planifier les prochaines étapes et définir les priorités pour le mois prochain. L'objectif est de finaliser toutes les fonctionnalités critiques d'ici la fin du trimestre.

Y a-t-il des questions ou des points bloquants que vous souhaitez soulever ?"""