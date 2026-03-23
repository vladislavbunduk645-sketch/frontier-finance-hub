// Ждем, пока загрузится вся страница
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Обновление времени в шапке (для LIVE эффекта)
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('current-time').textContent = timeString + ' UTC+3';
    }
    updateClock();
    setInterval(updateClock, 10000); // Обновляем каждые 10 секунд

    // 2. Инициализация Основного Продвинутого Графика
    // Это самый сложный виджет, он тянет много данных
    if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "autosize": true, // Занимает всё место в контейнере
            "symbol": "BINANCE:BTCUSDT", // Биткоин по умолчанию
            "interval": "H", // Часовой таймфрейм
            "timezone": "Etc/UTC",
            "theme": "dark", // Темная тема
            "style": "1", // Японские свечи
            "locale": "ru",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_side_toolbar": false, // Показываем инструменты для рисования
            "allow_symbol_change": true, // Позволяем пользователю менять актив
            "details": true, // Показываем детали справа
            "hotlist": true, // Список популярных активов
            "calendar": true, // Календарь экономических событий
            "container_id": "tradingview_advanced" // Куда вставлять
        });
    }

    // 3. Динамическая загрузка Виджета Технического Анализа
    // Мы создаем скрипт "на лету", чтобы не тормозить загрузку страницы
    const analysisScript = document.createElement('script');
    analysisScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    analysisScript.async = true;
    analysisScript.innerHTML = JSON.stringify({
        "interval": "1h", // Анализ на основе 1-часового таймфрейма
        "width": "100%",
        "isTransparent": true, // Прозрачный фон
        "height": "100%",
        "symbol": "BINANCE:BTCUSDT",
        "showIntervalTabs": true, // Позволяет менять таймфреймы
        "locale": "ru",
        "colorTheme": "dark"
    });
    document.getElementById('tv-analysis-container').appendChild(analysisScript);

    // 4. Динамическая загрузка Виджета Новостей (Timeline)
    const newsScript = document.createElement('script');
    newsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    newsScript.async = true;
    newsScript.innerHTML = JSON.stringify({
        "feedMode": "all_symbols", // Новости по всем рынкам
        "isTransparent": true,
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "colorTheme": "dark",
        "locale": "ru"
    });
    document.getElementById('tv-news-container').appendChild(newsScript);
});
