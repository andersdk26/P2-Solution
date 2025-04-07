/* This function calculates the Aggregated Prediction score for a movie using AggegatedPrediction (multiplicative strategy) (SEE Handbook - Best strategy)
- In simpler terms: It looks in the members property inside the AggGroup and checks their object properties for genrepreferences so it can see if the movie has same genre = a boost value. 
- So each member has Genreprefence mapping, where the most liked genre has the most boost value attached. 
IN EVEN SIMPLER TERMS: Is the movie the same genre as the persons in the group like, if so boost the movie score and add that to the IMDB score and you have final score for that movie. 


TO DO:
- Make type AggGroup
- Make type Member
- Use type Member to acces the properties relevant for AggGroup Such as GenrePreference object/class with the properties of genre and their boost values.
- Thoughts "Should we iterate through 100000 movies = 10 sec runtime i think."


*/
