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
          <img src='image_3.png' />
        </div>
        <div className='info-box'>
          <div className='title'>
            <h1>Patas em Harmonia</h1>
            <img src="Vector_1.png" />
          </div>
          <div className='info-title'>
            <h1>Nosso <span>AU</span>bjetivo</h1>
            <img src="paw_1.png" />
          </div>
          <div className='info-text'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum vehicula fermentum magna, a viverra ipsum
              blandit nec. Phasellus tincidunt ultricies pellentesque.
              Aenean eu metus id felis vestibulum sodales hendrerit quis nunc.
              Suspendisse potenti. Aliquam erat volutpat. Sed ex massa,
              pulvinar in sem dictum, pharetra tristique turpis.
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
              <img src="paw_1.png" />
            </div>
            <div className='info-text'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula fermentum magna, a viverra ipsum
                blandit nec. Phasellus tincidunt ultricies pellentesque.
                Aenean eu metus id felis vestibulum sodales hendrerit quis nunc.
                Suspendisse potenti. Aliquam erat volutpat. Sed ex massa,
                pulvinar in sem dictum, pharetra tristique turpis.
              </p>
            </div>
            <div className='button-one'>
              <Link to="/animais">
                <button>Nossos Bixinhos</button>
              </Link>
            </div>
          </div>
          <div className='box-one-img'>
            <img src="image_5.png" />
          </div>
        </div>

        <div className='box-two'>
          <div className='box-two-img'>
            <img src="image_1.png" />
          </div>
          <div className='info-box-two'>
            <div className='info-title'>
              <h1>Nossos P<span>rouf</span>jetos de Castração</h1>
              <img src="paw_1.png" />
            </div>
            <div className='info-text'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula fermentum magna, a viverra ipsum
                blandit nec. Phasellus tincidunt ultricies pellentesque.
                Aenean eu metus id felis vestibulum sodales hendrerit quis nunc.
                Suspendisse potenti. Aliquam erat volutpat. Sed ex massa,
                pulvinar in sem dictum, pharetra tristique turpis.
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
