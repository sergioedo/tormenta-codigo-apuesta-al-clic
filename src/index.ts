import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { cookie } from "@elysiajs/cookie";

const getNewSessionId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const looserGIF = "https://giphy.com/embed/5aYiXtUDSHbFBoScRP";
const winnerGIF = "https://giphy.com/embed/3o72FeJnjfZZ31WjBu";

interface ISessions<TValue> {
  [sessionId: string]: TValue;
}

interface UserSession {
  randomValue: Number;
}

const app = new Elysia()
  .use(html({ autoDetect: false, autoDoctype: false }))
  .use(cookie())
  .state("sessions", {} as ISessions<UserSession>)
  .derive(({ store: { sessions }, cookie, setCookie }) => {
    const sessionId = cookie["session-id"];
    console.log("cookie:", sessionId);
    if (sessions[sessionId]) return { session: sessions[sessionId] };

    const newSessionId = getNewSessionId();
    sessions[newSessionId] = { randomValue: Math.floor(Math.random() * 11) };
    setCookie("session-id", newSessionId);
    return {
      session: sessions[newSessionId],
    };
  })
  .get("/", () => Bun.file("./index.html"))
  .post(
    "/apuesta",
    ({ body: { clics }, html, session }) => {
      console.log({ session }, clics);
      const winner = session.randomValue === clics;
      const resultGIF = winner ? winnerGIF : looserGIF;
      const buttonAction = winner ? "reset" : "apuesta";
      const buttonText = winner ? "Volver a jugar" : "Prueba con otro";
      return html(
        `<button class="bet-button" type="submit" hx-post="/${buttonAction}">🎲 ${buttonText} 🎲</button>
        <div class="result-container">
          <iframe
            id="result-gif"
            src="${resultGIF}"
            width="480"
            height="304"
            frameborder="0"
            class="giphy-embed"
            allowfullscreen
          ></iframe>
        </div>`
      );
    },
    {
      body: t.Object({
        clics: t.Numeric(),
      }),
    }
  )
  .post("/reset", ({ cookie, removeCookie, store: { sessions }, html }) => {
    const sessionId = cookie["session-id"];
    if (sessionId) {
      delete sessions[sessionId];
      removeCookie("session-id");
    }
    return html(
      '<button class="bet-button" type="submit" hx-post="/apuesta">🎲 Apuesta 🎲</button>'
    );
  })
  .listen(3000);
