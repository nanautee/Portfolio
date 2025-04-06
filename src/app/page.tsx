"use client"

import styles from './styles/Popup.module.css'; 
import { useSpring, animated, config } from '@react-spring/web'; 
import { useState, useEffect, useCallback } from 'react'; 
import Image from 'next/image';  
import Link from 'next/link';  
import { useInView } from 'react-intersection-observer'; 
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number
  title: string
  description: string
  image: string
  links: {
    github: string
  }
}

const projects: Project[] = [
  {
    id: 1,
    title: "Приложение питания для школьников",
    description: `🍏 SchoolFood – Приложение для школьного питания 
      SchoolFood – это мобильное приложение, созданное для удобного контроля питания школьников. 
      Оно позволяет отслеживать потребление калорий, макронутриентов и воды, 
      выбирать блюда из доступного меню и управлять своим питанием с учетом индивидуальных параметров.
      
      Designed by Maria Novotnya | Developed by nanautee`,
    image: "/project1.png",
    links: {
      github: "https://github.com/nanautee/SchoolFood"
    }
  },
  {
    id: 2,
    title: "Сайт приюта для собак",
    description: "🐶 DOGSHELTERnext – Приложение для приюта собак. Добрые Руки – это веб-приложение для управления приютом для собак. Оно позволяет следить за питомцами, добавлять информацию о них, управлять процессом усыновления и взаимодействовать с волонтёрами и посетителями.\n\nDesigned by Maria Novotnya | Developed by nanautee",
    image: "/project2.png",
    links: {
      github: "https://github.com/nanautee/DOGSHELTERnext"
    }
  },
];

const AnimatedDiv = animated('div');
const AnimatedH3 = animated('h3');
const AnimatedModal = animated('div');

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slideProps = useSpring({
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { 
      transform: 'translateX(0%)', 
      opacity: isLoaded ? 1 : 0 
    },
    reset: true,
    config: { tension: 280, friction: 60 },
    key: currentIndex, // This will trigger animation on index change
  });

  const titleProps = useSpring({
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0px)', opacity: 1 },
    delay: 200,
    reset: true,
    config: { tension: 280, friction: 60 },
    key: currentIndex,
  });

  const modalSpring = useSpring({
    opacity: selectedProject ? 1 : 0,
    transform: selectedProject ? 'translateY(0)' : 'translateY(-100%)',
    config: config.gentle,
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.leftSide}></div>
        <div className={styles.rightSide}></div>
        <div className={styles.text}>
          <span>ВАМ</span>
          <span>НУЖЕН</span>
          <span>САЙТ</span>
          <span>?</span>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h2 className={styles.cardTitle}>Разработчик</h2>
          <p className={styles.cardText}>
            Денис разработчик, специализирующийся на Next.js, React и TypeScript Использую Tailwind CSS для стилизации, работаю с REST API и GraphQL, а также экспериментирую с 3D (Three.js, R3F).

Ценю чистый код и внимание к деталям, стараюсь делать всё максимально точно по дизайну. Интересуюсь анимацией, UI/UX и постоянно прокачиваю свои навыки.  техническую реализацию идей
          </p>
        </div>
        
        <div className={`${styles.infoCard} ${styles.infoCardRight}`}>
          <h2 className={styles.cardTitle}>Дизайнер</h2>
          <p className={styles.cardText}>
          Я UI/UX дизайнер, создающий стильные и удобные интерфейсы для веб и мобильных приложений. Специализируюсь на проектировании, прототипировании и анимациях с использованием Figma и Adobe XD. Стремлюсь к точности в реализации дизайна и всегда учитываю потребности пользователей. Работаю в команде, ценю внимание к деталям и всегда
          </p>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.contactCard}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2 className={styles.contactTitle}>Хотите обсудить проект?</h2>
          </div>
          <p className={styles.contactText}>
          Мы предлагаем создание уникальных и функциональных сайтов, дизайнов и интерфейсов, которые полностью соответствуют вашим целям и потребностям. Свяжитесь с нами, и мы поможем реализовать ваши идеи, сделав их удобными, стильными и эффективными! 🚀


          </p>
          <div className={styles.buttonContainer}>
            <a href="https://t.me/WWHubWW" className={styles.contactButton}>
              Telegram
            </a>
           
          </div>
        </div>
      </section>

      <section className={styles.portfolioSection}>
        <h2 className={styles.portfolioTitle}>Портфолио</h2>
        <div className={styles.portfolioContainer}>
          <button onClick={prevSlide} className={styles.sliderButton}>←</button>
          <div className={styles.portfolioContent}>
            <AnimatedDiv style={slideProps} className={styles.portfolioSlide}>
              <Image 
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                width={1200}
                height={675}
                priority={currentIndex === 1} // Prioritize initial image
                className={styles.portfolioImage}
                onClick={() => setSelectedProject(projects[currentIndex])}
                onLoad={() => setIsLoaded(true)}
              />
            </AnimatedDiv>
            <AnimatedH3 style={titleProps} className={styles.portfolioTitle}>
              {projects[currentIndex].title}
            </AnimatedH3>
          </div>
          <button onClick={nextSlide} className={styles.sliderButton}>→</button>
        </div>
        <div className={styles.portfolioDots}>
          {projects.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        
        <div className={styles.portfolioLinks}>
          <div className={styles.portfolioCredit}>
           
            <a 
              href="https://www.behance.net/masfhgfgdrygx" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Мария на Behance
            </a>
          </div>
          <div className={styles.portfolioCredit}>
           
            <a 
              href="https://github.com/nanautee" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Денис на GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <AnimatedModal style={modalSpring} className={styles.modal}>
          <div className={styles.modalContent}>
            <button 
              className={styles.modalClose}
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <Image 
              src={selectedProject.image}
              alt={selectedProject.title}
              width={800}
              height={450}
              className={styles.modalImage}
            />
            <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
            <p className={styles.modalDescription}>{selectedProject.description}</p>
            <div className={styles.modalLinks}>
              <a 
                href={selectedProject.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                GitHub
              </a>
            </div>
          </div>
        </AnimatedModal>
      )}
    </main>
  );
}