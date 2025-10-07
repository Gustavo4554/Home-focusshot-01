// src/components/TesteDeClique.jsx

import React, { useState, useEffect, useCallback } from 'react';
import '../styles/TesteDeClique.css';

// TAREFA 5: Duração do jogo diminuída para 10 segundos
const GAME_DURATION_SECONDS = 10; 
const ADD_CIRCLE_INTERVAL_MS = 300; 

const getRankings = () => {
    const rankings = localStorage.getItem('clickRankings');
    return rankings ? JSON.parse(rankings) : [];
};

const saveRanking = (name, score) => {
    const rankings = getRankings();
    const newRanking = { name, score, date: new Date().toLocaleString() };
    rankings.push(newRanking);
    rankings.sort((a, b) => b.score - a.score);
    localStorage.setItem('clickRankings', JSON.stringify(rankings.slice(0, 10)));
};

const TesteDeClique = () => {
    const [circles, setCircles] = useState([]);
    const [clickCount, setClickCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_SECONDS);
    const [gameStatus, setGameStatus] = useState('pronto'); 
    const [rankings, setRankings] = useState(getRankings());
    const [playerName, setPlayerName] = useState('');

    const removeCircle = (id) => {
        setCircles(prevCircles => prevCircles.filter(circle => circle.id !== id));
    };

    const addCircle = useCallback(() => {
        const gameArea = document.querySelector('.game-area');
        if (!gameArea) return;

        const containerWidth = gameArea.clientWidth;
        const containerHeight = gameArea.clientHeight;
        const circleSize = 50; 

        const newCircle = {
            id: Date.now(),
            x: Math.random() * (containerWidth - circleSize),
            y: Math.random() * (containerHeight - circleSize),
            size: circleSize,
        };
        setCircles(prevCircles => [...prevCircles, newCircle]);
    }, []);
    
    // TAREFA 4: CORREÇÃO DO BUG DO TIMER
    // Removido 'clickCount' e 'playerName' do array de dependências.
    // O timer agora só depende do status do jogo e do tempo, e não reinicia a cada clique.
    useEffect(() => {
        if (gameStatus === 'jogando' && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && gameStatus === 'jogando') {
            setGameStatus('encerrado');
            setCircles([]); 
            if (playerName) {
                saveRanking(playerName, clickCount);
                setRankings(getRankings());
            }
        }
    }, [gameStatus, timeRemaining]); // <-- DEPENDÊNCIAS CORRIGIDAS

    useEffect(() => {
        if (gameStatus === 'jogando') {
            const interval = setInterval(addCircle, ADD_CIRCLE_INTERVAL_MS);
            return () => clearInterval(interval);
        }
    }, [gameStatus, addCircle]);

    const startGame = () => {
        if (!playerName) {
            alert('Por favor, digite seu nome para começar o jogo.');
            return;
        }
        setClickCount(0);
        setTimeRemaining(GAME_DURATION_SECONDS);
        setCircles([]);
        setGameStatus('jogando');
    };

    const handleCircleClick = (circleId) => {
        if (gameStatus === 'jogando') {
            setClickCount(prevCount => prevCount + 1);
            removeCircle(circleId);
        }
    };

    const renderGameArea = () => {
        if (gameStatus === 'pronto') {
            return (
                <button className="start-button" onClick={startGame}>
                    Iniciar Jogo ({GAME_DURATION_SECONDS}s de Duração)
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