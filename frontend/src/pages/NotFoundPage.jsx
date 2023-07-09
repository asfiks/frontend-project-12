export const NotFoundPage = (namePage) => {
    const styleDiv = {
        textAlign: 'center',
        padding: '20px',
    }
    return (
    <div style={styleDiv}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но страница, которую вы ищете, не существует.</p>
    </div>
    );
};