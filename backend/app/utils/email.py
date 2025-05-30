import smtplib
from email.mime.text import MIMEText
import os

def send_otp_email(to_email: str, otp: str):
    msg = MIMEText(f"Your OTP code is: {otp}")
    msg["Subject"] = "Password Reset OTP"
    msg["From"] = os.getenv("EMAIL_USER")
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
        server.sendmail(msg["From"], [msg["To"]], msg.as_string())