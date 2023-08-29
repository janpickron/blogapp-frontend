import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export const PostCard = ({ post, index }) => {
  return (   
      <Link state={post} to="/single-post" className="custom-card">
        <Card >
          <Card.Body>
            <Card.Img variant="top"></Card.Img>
            <Card.Title><b>{post.title}</b></Card.Title>
            <Card.Subtitle className="date-size">
              {post.date}
            </Card.Subtitle>
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
  );
};
