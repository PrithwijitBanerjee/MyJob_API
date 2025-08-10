import { body } from "express-validator";

export const jobPostValidationRules = () => [
    body("jobTitle")
        .trim()
        .notEmpty()
        .withMessage("Job Title is required")
        .isLength({ min: 3, max: 35 })
        .withMessage("Job Title must be 3-35 characters"),

    body('jobTags')
        .trim()
        .notEmpty()
        .withMessage("Job Tags are required")
        .isLength({ max: 50 })
        .withMessage("Job Tags cannot exceed 50 characters"),

    body('jobRole')
        .trim()
        .notEmpty()
        .withMessage("Job Role is required")
        .isLength({ max: 50 })
        .withMessage("Job Role cannot exceed 50 characters"),

    body("minSalary")
        .trim()
        .notEmpty()
        .withMessage('Minimum Salary is required')
        .isNumeric()
        .withMessage('Minimum Salary must be a number')
        .custom((value, { req }) => {
            if (parseFloat(value) < 0) {
                throw new Error('Minimum Salary cannot be negative');
            }
            if (req.body.maxSalary && parseFloat(value) > parseFloat(req.body.maxSalary)) {
                throw new Error('Minimum Salary cannot be greater than Maximum Salary');
            }
            return true;
        }),

    body("maxSalary")
        .trim()
        .notEmpty()
        .withMessage('Maximum Salary is required')
        .isNumeric()
        .withMessage('Maximum Salary must be a number')
        .custom((value, { req }) => {
            if (parseFloat(value) < 0) {
                throw new Error('Maximum Salary cannot be negative');
            }
            if (req.body.minSalary && parseFloat(value) < parseFloat(req.body.minSalary)) {
                throw new Error('Maximum Salary cannot be less than Minimum Salary');
            }
            return true;
        }),

    body("salType")
        .trim()
        .notEmpty()
        .withMessage('Salary Type is required')
        .isIn(['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'])
        .withMessage('Invalid Salary Type'),

    body("education")
        .trim()
        .notEmpty()
        .withMessage('Education is required')
        .isLength({ max: 100 })
        .withMessage('Education cannot exceed 100 characters'),

    body("experience")
        .trim()
        .notEmpty()
        .withMessage('Experience is required')
        .isLength({ max: 50 })
        .withMessage('Experience cannot exceed 50 characters'),

    body("jobType")
        .trim()
        .notEmpty()
        .withMessage('Job Type is required')
        .isIn(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'])
        .withMessage('Invalid Job Type'),

    body("vacancies")
        .trim()
        .notEmpty()
        .withMessage('Vacancies is required')
        .isNumeric()
        .withMessage('Vacancies must be a number')
        .custom(value => {
            if (parseInt(value) <= 0) {
                throw new Error('Vacancies must be greater than 0');
            }
            return true;
        }),

    body("expiredOn")
        .trim()
        .notEmpty()
        .withMessage('Expiry Date is required')
        .isISO8601()
        .withMessage('Invalid date format. Use YYYY-MM-DD')
        .custom(value => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const expiryDate = new Date(value);

            if (expiryDate < today) {
                throw new Error('Expiry date must be in the future');
            }
            return true;
        }),

    body("jobLevel")
        .trim()
        .notEmpty()
        .withMessage('Job Level is required')
        .isIn(['Entry Level', 'Mid Level', 'Senior Level', 'Executive'])
        .withMessage('Invalid Job Level'),

    body("applyJobOn")
        .trim()
        .notEmpty()
        .withMessage('Apply method is required')
        .isIn(['On Jobpilot', 'External Platform', 'On Your Email'])
        .withMessage('Invalid application method'),

    body("description")
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 20, max: 2000 })
        .withMessage('Description must be 20-2000 characters'),

    body("jobResponsibility")
        .trim()
        .notEmpty()
        .withMessage('Job Responsibility is required')
        .isLength({ min: 20, max: 1000 })
        .withMessage('Job Responsibility must be 20-1000 characters')
];