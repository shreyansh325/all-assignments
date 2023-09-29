import React from "react";
import axios from "axios";

function Purchases() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [purchasedCourses, setPurchasedCourses] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/user/purchasedCourses", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setPurchasedCourses(res.data.purchasedCourses);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, []);

  if (isLoading)
    return (
      <div style={{ justifyContent: "center" }}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div>
      <h1>Courses purchased:</h1>
      <ul>
        {purchasedCourses.map((c) => (
          <li>
            <Item title={c.title} description={c.description} isAdmin={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Item(props) {
  return <>{props.title}</>;
}

export default Purchases;
