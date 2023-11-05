import Footer from '../../components/Footer';
import Header from '../../components/Header';
import '../../assets/globalStyle.css'
import './style.css'
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <Header></Header>
      <div className='container-one'>
        <div className='image-box'>
          <img src='/patas-em-hamonia-web/image_3.png' />
        </div>
        <div className='info-box'>
          <div className='title'>
            <h1>Patas em Harmonia</h1>
            <img src="/patas-em-hamonia-web/Vector_1.png" />
          </div>
          <div className='info-title'>
            <h1>Nosso <span>AU</span>bjetivo</h1>
            <img src="/patas-em-hamonia-web/paw_1.png" />
          </div>
          <div className='info-text'>
            <p>
              O "Patas em Harmonia" tem como missão principal combater o excesso de cães e gatos nas ruas,
              promovendo seu bem-estar e melhorando a qualidade de vida das comunidades. Nossa plataforma
              simplifica o processo de castração, conectando cuidadores de animais e projetos de esterilização,
              tornando-o mais acessível. Acreditamos que ao facilitar o controle populacional e prevenir
              doenças zoonóticas, podemos reduzir o abandono de animais. Estamos comprometidos em construir
              uma comunidade mais responsável e compassiva, onde o cuidado com os animais é uma prioridade,
              e convidamos todos a se juntarem a nós nessa jornada em busca de uma convivência harmônica entre humanos e animais.
            </p>
          </div>
          <div className='button'>
            <Link to="/agendar">
              <button>Castre seu bixinho</button>
            </Link>
          </div>
        </div>
      </div>

      <div className='container-two'>
        <div className='box-one'>
          <div className='info-box-one'>
            <div className='info-title'>
              <h1>Nossos Ani<span>miaus</span></h1>
              <img src="/patas-em-hamonia-web/paw_1.png" />
            </div>
            <div className='info-text'>
              <p>
                "Nossos Animais" é o coração do "Patas em Harmonia." Aqui,
                você encontrará uma coleção de cães e gatos encantadores que estão em busca de cuidados.
                Nossa plataforma reúne esses animais que foram cadastrados por cuidadores, projetos
                de proteção e ONGs em um esforço para garantir que eles encontrem o suporte necessário.
              </p>
            </div>
            <div className='button-one'>
              <Link to="/animais">
                <button>Nossos Bixinhos</button>
              </Link>
            </div>
          </div>
          <div className='box-one-img'>
            <img src="/patas-em-hamonia-web/image_5.png" />
          </div>
        </div>

        <div className='box-two'>
          <div className='box-two-img'>
            <img src="/patas-em-hamonia-web/image_1.png" />
          </div>
          <div className='info-box-two'>
            <div className='info-title'>
              <h1>Nossos P<span>rouf</span>jetos de Castração</h1>
              <img src="/patas-em-hamonia-web/paw_1.png" />
            </div>
            <div className='info-text'>
              <p>
                "Nossos Projetos de Castração" representam nossa dedicação ao controle populacional responsável
                de cães e gatos. Aqui, você encontrará informações detalhadas sobre os esforços de castração
                conduzidos por projetos de proteção animal e ONGs. Nossa plataforma visa apoiar e promover
                esses projetos, tornando o processo de esterilização mais acessível e eficaz.
                Ao explorar essa seção, você descobrirá como essas iniciativas estão fazendo a
                diferença na comunidade e como você pode se envolver. Junte-se a nós na missão de
                garantir um futuro mais brilhante e mais humano para os animais.
              </p>
            </div>
            <div className='button-two'>
              <Link to="/ongs">
                <button>Nossos Projetos</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
