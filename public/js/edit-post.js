const editPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title-post-edit").value.trim();
  const content = document.querySelector("#content-post-edit").value.trim();
  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  if (title && content) {
    const response = await fetch(`/api/posts/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Error. Unable to update blog post");
    }
  }
};

document.querySelector(".post-edit-form").addEventListener("submit", editPostHandler);
