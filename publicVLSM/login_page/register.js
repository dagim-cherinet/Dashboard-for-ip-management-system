const form = document.getElementById("reg__form");
const usernameInputDOM = document.getElementById("username");
const passwordInputDOM = document.getElementById("password");
const confirm_passwordInputDom = document.getElementById("confirm_password");
const positionInputDOM = document.getElementById("position");
const btn = document.getElementById("btn");
const user__container = document.querySelector(".user__container");

const resetInputField = () => {
  usernameInputDOM.value = "";
  passwordInputDOM.value = "";
  confirm_passwordInputDom.value = "";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;
  const confirm_password = confirm_passwordInputDom.value;
  const position = positionInputDOM.value;
  if (password !== confirm_password) {
    return alert("Password doesnot match!");
  }

  //   try {
  //     await axios.post("/api/register", { username, password });
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, position }),
    });
    const result = await response.json();
    console.log(result);
    if (!result.error) {
      alert("User registered Successfully");
      location.replace("../index.html");
      // resetInputField();
    } else {
      alert(result.error);
      resetInputField();
    }
  } catch (error) {
    console.log(error);
  }
});
