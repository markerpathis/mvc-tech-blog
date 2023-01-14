const commentHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector("#comment-post").value.trim();

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Error. Please make sure all fields are filled out.");
    }
  }
};

document.querySelector(".comment-form").addEventListener("submit", commentHandler);
