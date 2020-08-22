const form_comment = document.querySelector("#form_comment");
const txt_comment = document.querySelector("#form_comment > textarea");
const list_comments = document.querySelector("#list_comments");
const span_commentCount = document.querySelector("#span_commentCount");
const btn_comment_delete = document.querySelectorAll(".btn_comment_delete");

if (form_comment) {
  // const likeComment = () => {
  //   btn_comment[0].addEventListener("click", (e) => {
  //     console.log(e.currentTarget);
  //   });
  // };
  // const dislikeComment = () => {
  //   btn_comment[1].addEventListener("click", (e) => {
  //     console.log(e.currentTarget);
  //   });
  // };
  const deleteComment = () => {
    console.log(btn_comment_delete);

    btn_comment_delete.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const li = e.currentTarget.parentNode.parentNode;
        const text = li.querySelector(".comment_text").textContent;
        const timeDiff = li.querySelector(".time_diff").textContent;

        const payload = JSON.stringify({ text, timeDiff });
        console.log("payload", payload);

        const videoURL = window.location.href.split("/videos/");
        try {
          const Dcomment = await fetch(`/api/${videoURL[1]}/comment/delete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
          });

          if (Dcomment.status === 200) {
            console.log("green light");
            //delete comment on front
            li.remove();
            commentCountDown();
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
  deleteComment();

  const addTempComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = comment;
    li.appendChild(span);

    // list_comments.prepend(li);
    list_comments.insertBefore(li, list_comments.firstChild);
  };

  const commentCountUp = (e) => {
    span_commentCount.textContent++;
  };
  const commentCountDown = (e) => {
    span_commentCount.textContent--;
  };

  const addComment = async (e) => {
    e.preventDefault();

    const payload = JSON.stringify({ text: txt_comment.value });

    const videoURL = window.location.href.split("/videos/");
    try {
      const res = await fetch(`/api/${videoURL[1]}/comment/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: payload,
      });

      if (res.ok === true) {
        addTempComment(txt_comment.value);
        commentCountUp();
      }
    } catch (error) {
      console.log(error);
    }

    txt_comment.value = "";
  };
  form_comment.addEventListener("submit", addComment);
}
