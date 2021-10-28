import { Header } from "../components/Header";

export default function Developer({logged}) {
  return (
    <>
     { logged ? (
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
    ) : (
      <Header fixed padding routes={[ '/user/register', '/user/login', '/']}/>
    )
    }
    </>
  )
}