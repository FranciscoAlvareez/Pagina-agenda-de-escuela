function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:5000/login", {
          mail,
          password,
        });
        alert("Inicio de sesión exitoso");
        navigate("/home");
      } catch (error) {
        alert(error.response?.data?.error || "Error en el servidor");
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    );
  }
  