// Display work in progress article
import { Container, Button } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WritingComponent } from "../components/WritingComponent.jsx";
import { getArticle, imageUpload, updateArticle, uploadArticle } from "../api.js";

export function JournalistPage() {
  const editorRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [newArticle, setNewArticle] = useState(null);
  const [journalist, setJournalist] = useState(null);

  const [formData, setFormData] = useState({
    article_title: "",
    article_text: "",
    article_image_path: "",
    article_summary: "",
    article_submitted_at: "",
    article_historical_date: "",
    article_published_at: "",
    article_status_id: 0,
    article_journalist_id: 0,
    article_editor_id: 2,
    article_draft_number: 0
  });

  // Load logged in journalist from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("tntUser");
    const journalistObject = stored ? JSON.parse(stored) : null;
    setJournalist(journalistObject);
  }, []);

  // Load article if editing, otherwise mark as new
  useEffect(() => {
    const loadArticle = async (articleId) => {
      try {
        const article = await getArticle(articleId);

        if (editorRef.current && article.article_text) {
          editorRef.current.setContent(article.article_text);
        }

        if (article) {
          setFormData({ ...article });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (Number(id)) {
      loadArticle(id);
      setNewArticle(false);
    } else {
      setNewArticle(true);
    }
  }, [id]);

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      console.log("form is valid");
    } else {
      console.log("form is invalid");
    }
  };

  const onFormChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "article_image_path") {
      setFormData((prev) => ({
        ...prev,
        [name]: files && files[0] ? files[0] : null
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Shared helper used by:
   * - Save (draft) button
   * - Save and exit
   * - Submit (send for approval)
   *
   * statusId 1 = draft, 2 = submitted
   */
  const handleSave = async (statusId, { exitAfter = false } = {}) => {
    if (!journalist) {
      alert("No logged in journalist found");
      return;
    }

    const article_text = editorRef.current
      ? editorRef.current.getContent()
      : "";

    const timestamp = Date.now();
    const currentDateAsString = new Date(timestamp).toISOString();

    // Base payload
    const baseArticle = {
      ...formData,
      article_text,
      article_journalist_id: journalist.id,
      article_submitted_at: currentDateAsString,
      article_draft_number: 1,
      article_status_id: statusId
    };

    const imageValue = formData.article_image_path;
    const articleToSend = { ...baseArticle };

    try {
      // If the user has chosen a new file, upload to S3 first
      if (imageValue instanceof File) {
        // imageUpload returns the key, eg "bean.jpg"
        const key = await imageUpload(imageValue);
        articleToSend.article_image_path = key;
      } else if (typeof imageValue === "string") {
        // Existing seeded image path
        articleToSend.article_image_path = imageValue;
      } else {
        // No image
        articleToSend.article_image_path = "";
      }

      let article_id;
      if (newArticle) {
        article_id = await uploadArticle(articleToSend);
        const label = statusId === 1 ? "saved as draft" : "submitted";
        alert(`Article ID ${article_id} ${label}`);
      } else {
        article_id = await updateArticle(articleToSend);
        const label = statusId === 1 ? "updated (draft)" : "updated";
        alert(`Article ID ${article_id} ${label}`);
      }

      if (exitAfter) {
        navigate("/journalisthomepage");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save article, please try again later");
    }
  };

  const onSaveClicked = () => handleSave(1);
  const onSaveAndExitClicked = () => handleSave(1, { exitAfter: true });
  const onSubmitClicked = () => handleSave(2, { exitAfter: true });

  return (
    <Container className="mb-2">
      <Button
        className="orbitron"
        variant="primary"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>

      <div>
        <p></p>
        <h1 className="text-center" style={{ fontFamily: "orbitron" }}>
          Welcome Default Story Writer!
        </h1>
      </div>

      <WritingComponent
        formData={formData}
        setFormData={setFormData}
        onFormChange={onFormChange}
        onSubmit={submitForm}
        editorRef={editorRef}
        formRef={formRef}
      />

      <p></p>

      <div className="d-flex gap-2">
        <Button
          className="orbitron"
          onClick={onSubmitClicked}
          variant="warning"
        >
          SUBMIT
        </Button>
        <Button
          className="orbitron"
          variant="secondary"
          onClick={onSaveAndExitClicked}
        >
          SAVE and EXIT
        </Button>
        <Button
          className="orbitron"
          variant="outline-secondary"
          onClick={onSaveClicked}
        >
          SAVE (stay here)
        </Button>
      </div>
    </Container>
  );
}
