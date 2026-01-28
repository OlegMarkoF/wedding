const BOT_TOKEN = "8381550218:AAEs2RgcZxOXAKAJva2PHzeC-ahnk-yD2cs"; // ← ВСТАВЬ СВОЙ ТОКЕН
const CHAT_ID = "228516010"; // ← ВСТАВЬ СВОЙ CHAT ID

// Обратный отсчёт
const weddingDate = new Date("2026-07-10T15:00:00+03:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML =
      "<h2 style='color:var(--accent);'>Мы уже муж и жена! ❤️</h2>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

updateTimer();
setInterval(updateTimer, 1000);

// Музыка
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    toggleBtn.textContent = "♪ Выключить музыку";
  } else {
    music.pause();
    toggleBtn.textContent = "♪ Включить музыку";
  }
});

// Форма

// document.getElementById("rsvpForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   alert("Спасибо! Мы получили вашу анкету ❤️");
// });

document
  .getElementById("rsvpForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Собираем данные
    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;
    const secondDay = document.getElementById("second_day").value;

    // Чекбоксы: собираем выбранные
    const drinksCheckboxes = document.querySelectorAll(
      'input[name="drinks"]:checked'
    );

    const drinks =
      Array.from(drinksCheckboxes)
        .map((cb) => cb.value)
        .join(", ") || "Не указано";

    // Формируем сообщение
    const message = `
📝 Новая анкета от гостя!

👤 Имя: ${name}
✅ Присутствие: ${attendance}
🗓 Второй день: ${secondDay}
🍷 Напитки: ${drinks}

Спасибо!
    `.trim();

    // URL для Telegram API
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML", // для жирного и эмодзи
        }),
      });

      if (response.ok) {
        alert(
          "Анкета отправлена! Спасибо, что подтвердили участие ❤️ Мы вас ждём!"
        );
        document.getElementById("rsvpForm").reset(); // очищаем форму
      } else {
        alert(
          "Что-то пошло не так... Попробуйте позже или напишите нам в Telegram."
        );
      }
    } catch (error) {
      alert(
        "Ошибка соединения. Проверьте интернет или свяжитесь с нами напрямую."
      );
      console.error(error);
    }
  });
