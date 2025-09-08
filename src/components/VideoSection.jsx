import React from 'react';

const VideoSection = () => {
  // Video ma'lumotlari massivi
  const videos = [
    {
      id: 1,
      title: "Презентационный ролик СКБ \"Высота\"",
      thumbnail: "https://via.placeholder.com/300x170?text=Video+1+Thumbnail", // O'z rasmingizni qo'ying
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0", // O'z video URL'ingizni qo'ying
      profileLink: "#",
    },
    {
      id: 2,
      title: "Ремонт кранов и их рельсовых путей",
      thumbnail: "https://via.placeholder.com/300x170?text=Video+2+Thumbnail", // O'z rasmingizni qo'ying
      videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE?controls=0", // O'z video URL'ingizni qo'ying
      profileLink: "#",
    },
    {
      id: 3,
      title: "Видеотчет об СКБ Высота за 28.01.2023",
      thumbnail: "https://via.placeholder.com/300x170?text=Video+3+Thumbnail", // O'z rasmingizni qo'ying
      videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw?controls=0", // O'z video URL'ingizni qo'ying
      profileLink: "#",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-normal text-gray-800 relative inline-block pb-2">
            Видео
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
          </h2>
        </div>

        {/* Video Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {videos.map((video) => (
            <div key={video.id} className="w-full sm:w-80 md:w-96 lg:w-96 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate">{video.title}</h3>
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>0:00</span> {/* Placeholder for current time */}
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9l-.707.707m-9.9 2.828l.707-.707M6.03 13.518l.707.707M13.518 6.03l.707.707m0 6.364l-.707-.707m-7.072 0l-.707.707M10 12a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>0:00</span> {/* Placeholder for total time */}
                  </div>
                </div>
                <a
                  href={video.profileLink}
                  className="mt-4 flex items-center justify-end text-red-500 hover:text-red-600 transition-colors duration-200 text-sm font-semibold"
                >
                  Открыть профиль
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* "Load More" Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-md text-sm font-semibold">
            Смотреть другие наши видео
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;