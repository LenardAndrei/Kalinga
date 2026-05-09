const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#5a8a7a" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#9fb8b2" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const WORD_LIMIT = 18;

function truncateWords(text, limit) {
  const words = text.split(" ");
  if (words.length <= limit) return { preview: text, isTruncated: false };
  return { preview: words.slice(0, limit).join(" ") + "…", isTruncated: true };
}

function formatTimestamp(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / 86400000);
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 0) return `Today, ${timeStr}`;
  if (diffDays === 1) return `Yesterday, ${timeStr}`;
  return `${date.toLocaleDateString()}, ${timeStr}`;
}

export default function RecentAnnouncement() {

  // TEST DATA 
  const announcement = {
    id: "ann_001",
    authorName: "San Isidro Health Center",
    authorLocation: "Brgy. San Isidro, Mauban, Quezon",
    authorAvatarUrl: null,
    authorInitials: "SI",
    postedAt: "2025-04-11T10:00:00+08:00",
    title: "Community Healthcare Announcement",
    greeting: "Good day!",
    body: "We are pleased to inform everyone that our community healthcare services are available to support your well-being. Our team of dedicated professionals is ready to assist you with a wide range of health concerns.",
    postUrl: null,
    viewCount: 356,
    reactionCount: 50,
  };

  const { preview, isTruncated } = truncateWords(announcement.body, WORD_LIMIT);

  const handleViewPost = () => {
    if (announcement.postUrl) {
      window.open(announcement.postUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div style={{
      width: 515,
      height: 321,
      backgroundColor: "#6a9e94",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 20px 20px",
      boxSizing: "border-box",
      fontFamily: "'Poppins','Segoe UI', sans-serif",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    }}>

      {/* Title */}
      <div style={{ color: "#ffffff", fontWeight: 900, fontSize: 24, textAlign: "center", lineHeight: 1.2, marginBottom: 12, marginTop: -5 }}>
        Recent Announcement
      </div>

      {/* White Card */}
      <div style={{
        width: 475,
        height: 350,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: "14px 18px 10px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}>

        {/* Header Row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

            {/* Avatar — shows image if URL exists, falls back to initials */}
            <div style={{
              width: 40, height: 40, borderRadius: "50%", backgroundColor: "#dce8e5",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              fontSize: 13, fontWeight: 700, color: "#5a7a75",
            }}>
              {announcement.authorAvatarUrl
                ? <img src={announcement.authorAvatarUrl} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                : announcement.authorInitials || <UserIcon />
              }
            </div>

            {/* Name + Location */}
            <div>
              <div style={{ fontWeight: "bold", fontSize: 16, color: "#1a2e2b", lineHeight: 1.3 }}>
                {announcement.authorName}
              </div>
              <div style={{ fontStyle: "italic", fontWeight: 400, fontSize: 12, color: "#5a7a75", lineHeight: 1.3 }}>
                {announcement.authorLocation}
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div style={{ fontWeight: 400, fontSize: 12, color: "#8aada8", whiteSpace: "nowrap", paddingTop: 2 }}>
            {formatTimestamp(announcement.postedAt)}
          </div>
        </div>

        {/* Announcement Body */}
        <div style={{ flex: 1, marginTop: 10 }}>
          <div style={{ fontWeight: "bold", fontSize: 16, color: "#1a2e2b", marginBottom: 4 }}>
            {announcement.title.toUpperCase()}
          </div>
          <div style={{ fontWeight: 400, fontSize: 12, color: "#2e4a46", lineHeight: 1.6 }}>
            {announcement.greeting}
            <br />
            {preview}
          </div>
          {isTruncated && (
            <div
              onClick={handleViewPost}
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: announcement.postUrl ? "#5a8a7a" : "#a0b8b4",
                cursor: announcement.postUrl ? "pointer" : "not-allowed",
                marginTop: 4,
                display: "inline-block",
                textDecoration: announcement.postUrl ? "underline" : "none",
                opacity: announcement.postUrl ? 1 : 0.6,
              }}
              title={announcement.postUrl ? "Open original post" : "Link not yet available"}
            >
              View entire post
            </div>
          )}
        </div>

        {/* Footer — views & reactions */}
        <div style={{ borderTop: "1px solid #e0eeeb", paddingTop: 5, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: "bold", fontSize: 12, color: "#6a9e94" }}>
            {announcement.viewCount.toLocaleString()} views
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <HeartIcon />
            <span style={{ fontWeight: "bold", fontSize: 12, color: "#6a9e94" }}>
              {announcement.reactionCount.toLocaleString()} reactions
            </span>
          </div>
        </div>
      </div>

      {/* Manage Button */}
      <button style={{
        marginTop: 14,
        width: 300,
        height: 45,
        backgroundColor: "#ffffff",
        border: "none",
        borderRadius: 50,
        fontWeight: 900,
        fontSize: 18,
        color: "#1a2e2b",
        cursor: "pointer",
        letterSpacing: 0.3,
        fontFamily: "'Poppins','Segoe UI', sans-serif",
      }}>
        Manage Announcements
      </button>
    </div>
  );
}