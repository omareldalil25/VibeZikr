import React, { useEffect, useState } from 'react';
import './Adhkar.css';

const Adhkar = ({ onBack }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [adhkar, setAdhkar] = useState([]);
    const [tasbeehCount, setTasbeehCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = () => {
            const categoryData = [
                { id: 1, name: 'أذكار الصبـــــــــاح', icon: '/images/sabaah.svg' },
                { id: 2, name: 'أذكار المســــــــاء', icon: '/images/masaa.svg' },
                { id: 3, name: 'أذكار بعد الصــلاة', icon: '/images/Azkar.svg' },
                { id: 4, name: 'الرُّقية الشرعية من السنة النبوية', icon: '/images/Ruqyah sunnah.svg' }, // New category
                { id: 5, name: 'الرُّقية الشرعية من القرآن الكريم', icon: '/images/Ruqyah Quran.svg' }, // New category
                { id: 6, name: 'تسبيــــح', icon: '/images/sebha.svg' }, // Existing category
            ];
            setCategories(categoryData);
            setLoading(false);
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        setLoading(true);

        if (category.id === 6) { // Check for Tasbeeh
            setLoading(false);
            return; // لا حاجة لتحميل البيانات للتسبيح
        }

        let adhkarList = [];
        try {
            switch (category.id) {
                case 1:
                    const responseSabah = await fetch('/data/azkar_sabah.json');
                    const dataSabah = await responseSabah.json();
                    adhkarList = dataSabah.content;
                    break;
                case 2:
                    const responseMassa = await fetch('/data/azkar_massa.json');
                    const dataMassa = await responseMassa.json();
                    adhkarList = dataMassa.content;
                    break;
                case 3:
                    const responsePostPrayer = await fetch('/data/PostPrayer_azkar.json');
                    const dataPostPrayer = await responsePostPrayer.json();
                    adhkarList = dataPostPrayer.content;
                    break;
                case 4:
                    const responseRuqaSunnah = await fetch('/data/ruqa_sunnah.json');
                    const dataRuqaSunnah = await responseRuqaSunnah.json();
                    adhkarList = dataRuqaSunnah.content;
                    break;
                case 5:
                    const responseRuqaQuran = await fetch('/data/ruqa_quran.json');
                    const dataRuqaQuran = await responseRuqaQuran.json();
                    adhkarList = dataRuqaQuran.content;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching adhkar:', error);
        } finally {
            const updatedAdhkar = adhkarList.map((item) => ({
                ...item,
                currentRepeat: item.repeat,
            }));
            setAdhkar(updatedAdhkar);
            setLoading(false);
        }
    };

    const handleIncrementTasbeeh = () => {
        if (tasbeehCount < 100) {
            setTasbeehCount((prevCount) => prevCount + 1);
        }
    };

    const handleDecrement = (index) => {
        setAdhkar((prevAdhkar) => {
            const newAdhkar = [...prevAdhkar];
            if (newAdhkar[index].currentRepeat > 0) {
                newAdhkar[index].currentRepeat -= 1;
            }
            return newAdhkar;
        });
    };

    return (
        <div className="adhkar-container">
            <button className="back-button" onClick={onBack} style={{ backgroundColor: "#000" }}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
            <h2 style={{ color: '#FDFFF0', marginTop: '80px' }}>اخْتَـــرْ مِــنْ الِاذْكَــارِ</h2>
            {loading && !selectedCategory ? (
                <p>جاري تحميل الأنواع...</p>
            ) : (
                <ul className="categories-list">
                    {categories.map((category) => (
                        <li 
                            key={category.id} 
                            onClick={() => handleCategoryClick(category)} 
                            className="category-item"
                        >
                            <img 
                                src={category.icon} 
                                alt={category.name} 
                                className="category-icon" 
                            />
                            <span className="category-name">{category.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {selectedCategory && selectedCategory.id === 6 && (
                <div className="tasbeeh-counter">
                    <h3 style={{color:"#FDFFF0"}}>عداد التسبيح</h3>
                    <div
                        className={`counter-circle2 ${tasbeehCount === 100 ? 'completed' : ''}`}
                        onClick={handleIncrementTasbeeh}
                    >
                        <div
                            className={`counter-circle2-inner ${tasbeehCount === 100 ? 'completed' : ''}`}
                        >
                            <span className="repetition-label">التكرار</span>
                            {tasbeehCount}
                        </div>
                    </div>
                    {tasbeehCount === 100 && <p className="completed-text" style={{color:"#FDFFF0"}}>لقد أكملت 100 تسبيحة!</p>}
                </div>
            )}

            {selectedCategory && selectedCategory.id !== 6 && (
                <div className="adhkar-list">
                    <h3>الأذكار الخاصة بـ {selectedCategory.name}</h3>
                    {loading ? (
                        <p>جاري تحميل الأذكار...</p>
                    ) : (
                        <ul>
                            {adhkar.map((dhikr, index) => (
                                <li
                                    key={index}
                                    className={`dhikr-item ${dhikr.currentRepeat === 0 ? 'completed' : ''}`}
                                    onClick={() => handleDecrement(index)}
                                >
                                    <p className="zekr-text">{dhikr.zekr}</p>
                                    {dhikr.bless && <p className="bless-text">{dhikr.bless}</p>}
                                    <div
                                        className={`counter-circle ${dhikr.currentRepeat === 0 ? 'zero' : ''}`}
                                    >
                                        {dhikr.currentRepeat}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Adhkar;