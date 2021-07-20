import React from 'react';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GiCookingPot } from 'react-icons/gi';
import { IoMenuOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import placeholder from '../images/placeholder.jpg';

import { searchRandomRecipe } from '../utils/API';
import SearchCard from '../components/SearchCard';

const HeaderHome = () => {

    // create state for holding returned spoonacular api data
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    useEffect(() => {
        searchRandom();
    }, []);

      // function to search for random recipes
    async function searchRandom() {
        let recipeData;
        try {
        await searchRandomRecipe()
            .then(response => response.json())
            .then(data => recipeData = data);

        const recipes = recipeData.recipes.map((recipe) => ({
            recipeId: recipe.id,
            title: recipe.title,
            image: recipe.image || placeholder,
        }));
        setSearchedRecipes(recipes);
        console.log(recipes);
        } catch (e) {
        console.error(e);
        }
    };


    return (

        <div className="flex w-3/4 flex-col bg-darkBlue mb-10 pt-5 h-full">
            <div>
                <Link to='/' className='px-12 flex'>
                    <IconContext.Provider value={{ color: 'green', size: '5.5rem' }}>
                        <div>
                            <GiCookingPot />
                        </div>
                    </IconContext.Provider>
                    <h1 className='pl-4 pt-5 text-offWhite font-landing text-6xl '>RECIPES OUTLOUD</h1>
                </Link>

                <p className="pl-14 text-lg text-offWhite font-mono">Expand Your Joy of Cooking!</p>

            </div>

            <div className="flex flex-row">

                <section className="flex h-96 mx-5" id="Search">
                    <figure className="flex rounded">
                        {searchedRecipes.map((recipe) => (
                        <SearchCard className="flex justify-center w-1/4" key={recipe.recipeId} id={recipe.recipeId} title={recipe.title} image={recipe.image} />
                        ))}
                    </figure>
                </section>
            </div>

        </div>
    )
}

export default HeaderHome;