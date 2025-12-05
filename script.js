const discordUserId = "1435071462087327785";

async function loadDiscord() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
        const data = await res.json();

        if (!data.success) {
            document.getElementById("discord-profile").innerHTML = "<p>Discord Profil nicht gefunden.</p>";
            return;
        }

        const d = data.data;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserId}/${d.discord_user.avatar}.png?size=128`;

        // Status Farben wie guns.lol
        let statusColor = {
            online: "#43b581",
            idle: "#faa61a",
            dnd: "#f04747",
            offline: "#747f8d"
        }[d.discord_status] || "#747f8d";

        // Aktuelle Aktivität
        let activity = "Keine Aktivität";
        if (d.activities && d.activities.length > 0) {
            const act = d.activities[0];
            activity = act.name || act.type || "Aktiv";
        }

        document.getElementById("discord-profile").innerHTML = `
            <div class="d-avatar-wrapper" style="border: 2px solid ${statusColor}; border-radius: 50%; padding:2px;">
                <img class="d-avatar" src="${avatarUrl}" alt="Discord Avatar">
            </div>
            <div>
                <p><b>${d.discord_user.username}#${d.discord_user.discriminator}</b></p>
                <p>Status: <span style="color:${statusColor}; text-transform: uppercase;">${d.discord_status}</span></p>
                <p>${activity}</p>
            </div>
        `;
    } catch (err) {
        console.log(err);
        document.getElementById("discord-profile").innerHTML = "<p>Fehler beim Laden.</p>";
    }
}

loadDiscord();
