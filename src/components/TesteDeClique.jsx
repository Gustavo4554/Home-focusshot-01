import React, { useState, useEffect, useCallback } from 'react';
import '../styles/TesteDeClique.css';

// ========================================
// CONFIGURAÇÕES ATUALIZADAS
// ========================================
const GAME_DURATION_SECONDS = 30; // AGORA SÃO 30 SEGUNDOS
const ADD_CIRCLE_INTERVAL_MS = 300; // CÍRCULOS APARECEM MUITO MAIS RÁPIDO
// ========================================

// Funções utilitárias para o ranking
const getRankings = () => {
    const rankings = localStorage.getItem('clickRankings');
    return rankings ? JSON.parse(rankings) : [];
};

const saveRanking = (name, score) => {
    const rankings = getRankings();
    const newRanking = { name, score, date: new Date().toLocaleString() };
    rankings.push(newRanking);
    // Ordena por score (do maior para o menor) e pega os 10 melhores
    rankings.sort((a, b) => b.score - a.score);
    localStorage.setItem('clickRankings', JSON.stringify(rankings.slice(0, 10)));
};


const TesteDeClique = () => {
    const [circles, setCircles] = useState([]);
    const [clickCount, setClickCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_SECONDS);
    const [gameStatus, setGameStatus] = useState('pronto'); // 'pronto', 'jogando', 'encerrado'
    const [rankings, setRankings] = useState(getRankings());
    const [playerName, setPlayerName] = useState('');

    // --- Lógica de Criação e Remoção de Círculos ---

    const removeCircle = (id) => {
        setCircles(prevCircles => prevCircles.filter(circle => circle.id !== id));
    };

    const addCircle = useCallback(() => {
        // Cálculo de dimensões (mantido para evitar erros de limite)
        const containerWidth = window.innerWidth * 0.8;
        const containerHeight = window.innerHeight * 0.6;
        const circleSize = 50; 

        const newCircle = {
            id: Date.now(),
            x: Math.random() * (containerWidth - circleSize),
            y: Math.random() * (containerHeight - circleSize),
            size: circleSize,
        };
        setCircles(prevCircles => [...prevCircles, newCircle]);
    }, []);


    // --- Efeitos do Jogo (Timer e Aparecimento de Círculos) ---

    // Efeito: Timer do jogo
    useEffect(() => {
        if (gameStatus === 'jogando' && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && gameStatus === 'jogando') {
            setGameStatus('encerrado');
            setCircles([]); // Limpa a tela
            // Salva a pontuação no ranking
            if (playerName) {
                saveRanking(playerName, clickCount);
                setRankings(getRankings()); // Atualiza o ranking exibido
            }
        }
    }, [gameStatus, timeRemaining, clickCount, playerName]);

    // Efeito: Adicionar novos círculos (só quando estiver jogando)
    useEffect(() => {
        if (gameStatus === 'jogando') {
            const interval = setInterval(() => {
                addCircle();
            }, ADD_CIRCLE_INTERVAL_MS); // USA O NOVO INTERVALO RÁPIDO
            return () => clearInterval(interval);
        }
    }, [gameStatus, addCircle]);


    // --- Funções de Controle do Jogo ---

    const startGame = () => {
        if (!playerName) {
            alert('Por favor, digite seu nome para começar o jogo.');
            return;
        }
        setClickCount(0);
        setTimeRemaining(GAME_DURATION_SECONDS); // USA A NOVA DURAÇÃO
        setCircles([]);
        setGameStatus('jogando');
    };

    const handleCircleClick = (circleId) => {
        if (gameStatus === 'jogando') {
            setClickCount(prevCount => prevCount + 1);
            removeCircle(circleId);
        }
    };


    // --- Renderização do Jogo ---

    const renderGameArea = () => {
        if (gameStatus === 'pronto') {
            return (
                <button className="start-button" onClick={startGame}>
                    Iniciar Jogo (30s de Duração)
                </button>
            );
        }
        if (gameStatus === 'encerrado') {
            return (
                <div className="game-over-message">
                    <h3>Tempo Esgotado!</h3>
                    <p>Sua Pontuação Final: <strong>{clickCount} cliques</strong></p>
                    <button className="restart-button" onClick={startGame}>
                        Jogar Novamente
                    </button>
                </div>
            );
        }
        
        // Status: Jogando
        return circles.map(circle => (
            <div
                key={circle.id}
                className="circle"
                onClick={() => handleCircleClick(circle.id)}
                style={{
                    width: `${circle.size}px`,
                    height: `${circle.size}px`,
                    left: `${circle.x}px`,
                    top: `${circle.y}px`,
                }}
            />
        ));
    };


    return (
        <div className="game-container">
            <h2>Teste de Agilidade de Cliques</h2>
            
            <div className="controls">
                <input
                    type="text"
                    placeholder="Seu Nome/Nickname"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    disabled={gameStatus === 'jogando'}
                />
                <p className="timer">
                    Tempo: <strong className={timeRemaining <= 5 ? 'low-time' : ''}>{timeRemaining}s</strong>
                </p>
                <p className="score-display">
                    Cliques: <strong>{clickCount}</strong>
                </p>
            </div>

            <div className="game-area">
                {renderGameArea()}
            </div>

            <div className="ranking-section">
                <h3>Ranking dos Melhores Cliques</h3>
                <ol className="ranking-list">
                    {rankings.map((rank, index) => (
                        // A linha do jogador atual é destacada se o jogo estiver encerrado e o nome corresponder
                        <li key={index} className={rank.name === playerName && gameStatus === 'encerrado' ? 'current-player' : ''}>
                            <span>{index + 1}. {rank.name}</span>
                            <span>{rank.score} Cliques</span>
                        </li>
                    ))}
                </ol>
                {rankings.length === 0 && <p>Nenhum recorde salvo ainda.</p>}
            </div>
        </div>
    );
};

export default TesteDeClique;