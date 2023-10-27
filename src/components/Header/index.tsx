import { Link } from 'react-router-dom'
import '../../assets/globalStyle.css'
import './style.css'

type Props = {}

export default function Header({ }: Props) {
  return (
    <div className='header'>
      <div className='section-one'>
        <Link to='/'>
          <img src='/patas-em-hamonia-web/public/logo.png' />
          <h1>Patas em Harmonia</h1>
        </Link>
      </div>
      <div className='section-two'>
        <ul>
          <li><Link to='/agendar'>Castre agora</Link></li>
          <li><Link to='/ongs'>Nossos projetos</Link></li>
          <li><Link to='/animais'>Nossos animais</Link></li>
          <li><Link to='/perfil'>Perfil</Link></li>
        </ul>
        <Link to='/perfil'><img src='/patas-em-hamonia-web/public/default_profile.png' /></Link>
      </div>
    </div>
  )
}