# Very basic example. You can replace this with a trained ML model later.
scam_keywords = ["lottery", "winner", "prize", "free", "urgent", "click", "money", "credit card"]

def is_scam_message(text):
    text = text.lower()
    for keyword in scam_keywords:
        if keyword in text:
            return True
    return False
