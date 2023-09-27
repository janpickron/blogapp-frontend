import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export const PostCard = ({ post, index }) => {
  return (
    <Link state={post} to={`/single-post/${post._id}`} className="link-posts">
      <Card className="custom-card">
        <Card.Body>
          <Card.Img className="card-img-top"
            variant="top"
            src={`https://source.unsplash.com/random?sig=${index}`}
            alt="Different image showing randomly"
          />
          <Card.Title className="card-title-postcard">
            <b>{post.title}</b>
          </Card.Title>
          <Card.Subtitle className="date-size">{post.date}</Card.Subtitle>
          <Card.Text className="card-content">{post.content}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
