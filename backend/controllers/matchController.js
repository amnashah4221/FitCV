const {extractAndMatchSkills} = require('../utils/skillsMatcher');
const {extractTextFromPDF} = require('../utils/pdfParser');

const matchSkills = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const {jobDescription} = req.body;

        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }

        const resumeText = await extractTextFromPDF(req.file.buffer);
        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ message: 'Could not extract text from PDF' })
            }
        const result = await extractAndMatchSkills(resumeText, jobDescription);

        res.status(200).json({
            message: 'Skills matched successfully',
            data: result
        })
    }
    catch (error) {
        console.error('Error matching skills:', error);
        res.status(500).json({ error: 'An error occurred while matching skills' });
    }   

}
module.exports = { matchSkills };