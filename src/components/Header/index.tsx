import '../../assets/globalStyle.css'
import '../Header/style.css'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='header'>
        <div className='section-one'>
            <img src='logo.png'/>
            <h3>Patas em Harmonia</h3>
        </div>
        <div className='section-two'>
            <ul>
                <li>Castre agora</li>
                <li>Nossos projetos</li>
                <li>Nossos animais</li>
                <li>Perfil</li>
                <li><img src='default_profile.png'/></li>
            </ul>
        </div>
    </div>
  )
}