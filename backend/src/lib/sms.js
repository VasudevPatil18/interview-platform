import twilio from "twilio";

const getClient = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
};

export const sendSMS = async (to, message) => {
  if (!to) return { success: false, skipped: true, reason: "No phone number" };

  const client = getClient();
  if (!client) {
    console.log(`📱 [DEV SMS] To: ${to}\n${message}\n`);
    return { success: true, dev: true };
  }

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`✅ SMS sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error(`❌ SMS failed to ${to}:`, err.message);
    return { success: false, error: err.message };
  }
};

export const smsTemplates = {
  meetingInvite: ({ hostName, problem, difficulty, meetingCode, joinUrl }) =>
    `🎯 Talent IQ - Meeting Invite\n\n${hostName} invited you to a ${difficulty} coding session!\n\nProblem: ${problem}\nMeeting Code: ${meetingCode}\n\nJoin here: ${joinUrl}\n\nReply STOP to unsubscribe.`,

  meetingReminder: ({ userName, problem, meetingCode, joinUrl, timeUntil }) =>
    `⏰ Talent IQ - Reminder\n\nHi ${userName}! Your coding session starts ${timeUntil}.\n\nProblem: ${problem}\nMeeting Code: ${meetingCode}\n\nJoin: ${joinUrl}`,

  participantJoined: ({ participantName, problem, joinUrl }) =>
    `👋 Talent IQ - ${participantName} joined your session!\n\nProblem: ${problem}\n\nJoin now: ${joinUrl}`,

  sessionEnded: ({ problem }) =>
    `✅ Talent IQ - Your coding session "${problem}" has ended. Check your dashboard for feedback.`,

  interviewScheduled: ({ interviewerName, problem, difficulty, scheduledTime, meetingCode, joinUrl }) =>
    `📅 Talent IQ - Interview Scheduled!\n\n${interviewerName} scheduled an interview with you.\n\nProblem: ${problem} (${difficulty})\nTime: ${scheduledTime}\nMeeting Code: ${meetingCode}\n\nJoin: ${joinUrl}`,

  interviewCancelled: ({ cancelledBy, scheduledTime, reason }) =>
    `❌ Talent IQ - Interview Cancelled\n\nYour interview scheduled for ${scheduledTime} was cancelled by the ${cancelledBy}.${reason ? `\nReason: ${reason}` : ""}`,
};
