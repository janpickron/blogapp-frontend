import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export const PostCard = ({ post, index }) => {
  return (
    <Link state={post} to="/single-post" className="custom-card">
      <Card style={{ width: "16rem" }}>
        <Card.Body>
          <Card.Img
            className="card-img-top"
            variant="top"
            src={`https://source.unsplash.com/random?sig=${index}`}
            alt=""
          />
          <Card.Title className="card-title-postcard">
            <b>{post.title}</b>
          </Card.Title>
          <Card.Subtitle className="card-subtitle mb-2 text-muted">
            {post.date}
          </Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
