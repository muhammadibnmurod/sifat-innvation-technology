import React from 'react';

const AskQuestionSection = () => {
  return (
    <section className="bg-emerald-700 py-16 md:py-12 text-center">
      <div className="container mx-auto px-4">
        <p className="text-xl md:text-2xl font-semibold text-red-400 mb-4">
          Вы можете задать любой интересующий вас
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12 leading-tight">
          вопрос по подъемным сооружениям.
        </h2>
        <button className="px-8 py-4 bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white text-lg font-semibold rounded-md shadow-lg">
          ЗАДАТЬ ВОПРОС
        </button>
      </div>
    </section>
  );
};

export default AskQuestionSection;