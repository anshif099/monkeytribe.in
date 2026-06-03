/**
 * Utility to send email notifications for database backups.
 * Hits the secure backend endpoint /api/send-backup-email.php.
 */

export async function sendBackupEmail(subject: string, data: any): Promise<boolean> {
  const timestamp = data.timestamp ? new Date(data.timestamp).toLocaleString() : new Date().toLocaleString();
  
  // Format details nicely into text
  let detailsText = "";
  for (const [key, value] of Object.entries(data)) {
    if (key === "timestamp") continue;
    // Format camelCase key to readable label (e.g., "fullName" -> "Full Name")
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    
    detailsText += `• ${label}: ${value}\n`;
  }
  
  const body = `
New database record backup notification:
----------------------------------------
Subject: ${subject}
Received At: ${timestamp}

Details:
${detailsText}
----------------------------------------
This email was automatically sent as a backup at the same time the data was saved to the Firebase Realtime Database.
  `.trim();

  try {
    const response = await fetch("/api/send-backup-email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "hello@monkeytribe.in",
        subject: subject,
        body: body,
        data: data,
      }),
    });
    
    const result = await response.json();
    if (response.ok && result.success) {
      console.log("Backup email sent successfully via SMTP endpoint.");
      return true;
    } else {
      console.error("Backup email failed:", result.error || result.message);
    }
  } catch (error) {
    console.error("Error sending backup email:", error);
  }

  return false;
}
