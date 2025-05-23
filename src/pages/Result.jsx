import { useNavigate } from 'react-router-dom';

const cartoons = ["ريمي", "ماوكلي", "هايدي", "عهد الأصدقاء", "أنا وأخي", "بال وسيبستيان", "بابار", "سبونج بوب"];

const Home = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    
    <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">الشارة الكرتونية</h1>      
=======
    <div className="p-6 text-center">
>>>>>>> 2b692539e0870a38093b0f827423a46341042b24
      <h1 className="text-2xl font-bold mb-6">اختر الكرتون</h1>
      <div className="grid gap-4">
        {cartoons.map(name => (
          <button
            key={name}
            onClick={() => navigate('/quiz', { state: { cartoon: name } })}
            className="bg-purple-500 text-white py-2 px-4 rounded-xl hover:bg-purple-600"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
