const deletePostHandler = async (event) => {
  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const response = await fetch(`/api/posts/edit/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete blog post");
  }
};

document.querySelector(".post-delete").addEventListener("click", deletePostHandler);
