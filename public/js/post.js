const postHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title-post").value.trim();
  const content = document.querySelector("#content-post").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Error. Please make sure all fields are filled out.");
    }
  }
};

document.querySelector(".post-form").addEventListener("submit", postHandler);
