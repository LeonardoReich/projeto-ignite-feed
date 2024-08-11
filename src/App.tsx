import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post } from './components/Post';

const aPosts = [
    {
        iId: 1,
        oAuthor: {
            sAvatarUrl: 'https://github.com/diego3g.png',
            sName: 'Diego Fernandes',
            sRole: 'Web Developer'
        },
        aContent: [
            {
                sType: 'paragraph',
                sContent: 'Fala galeraa 👋'
            },
            {
                sType: 'paragraph',
                sContent: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
            },
            {
                sType: 'link',
                sContent: 'jane.design/doctorcare'
            }
        ],
        dPublishedAt: new Date('2024-08-10 12:32:00')
    },
    {
        iId: 2,
        oAuthor: {
            sAvatarUrl: 'https://github.com/maykbrito.png',
            sName: 'Mayk Brito',
            sRole: 'Web Developer'
        },
        aContent: [
            {
                sType: 'paragraph',
                sContent: 'Fala galeraa 👋'
            },
            {
                sType: 'paragraph',
                sContent: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
            },
            {
                sType: 'link',
                sContent: 'jane.design/doctorcare'
            }
        ],
        dPublishedAt: new Date('2024-08-10 20:30:00')
    },
];

export function App() {
    return (
        <div>
              <Header />

              <div className={styles.wrapper}>
                <aside>
                    <Sidebar />
                </aside>
                <main>
                    {aPosts.map(oPost => {
                        return (
                            <Post 
                                key={oPost.iId}
                                author={oPost.oAuthor}
                                content={oPost.aContent}
                                publishedAt={oPost.dPublishedAt}
                            />
                        );
                    })}
                </main>
            </div>
        </div>
  )
}