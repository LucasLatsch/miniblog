import styles from "./Home.module.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search/" + query);
  };
  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div></div>
      {loading && <p>Carregando...</p>}
      {posts && posts.map((post) => <h3>{post.title}</h3>)}
      {posts && posts.length === 0 && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Crie um novo post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
