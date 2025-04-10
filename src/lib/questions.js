const media1 = "https://media.licdn.com/dms/image/v2/D5612AQE6N0o82aXatQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721177183026?e=2147483647&v=beta&t=_6JpFsbJGVA-TnJDzbgj9w9sIr8zQYflbTGSAqxDYcE";
const media2 = "https://www.lifesciencehistory.com/wp-content/uploads/1994/01/researchers_lab.jpg";
const media4 = "https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2024/03/military_robot_dog_1241837356.jpg";
const media3 = "https://myattorneyisarobot.com/wp-content/uploads/2024/01/lectern.png?w=1024";
const media5 = "https://www.elegantthemes.com/blog/wp-content/uploads/2023/07/history-of-AI-art.jpg";

// Main ethical dilemma questions
export const ethicalDilemmas = [
    {
        id: "q1",
        title: "AI Caregiver & Human Autonomy",
        scenario: `
      It's 2035, hospitals use advanced AI caregivers to assist elderly patients. 
      These AI caregivers, equipped with sophisticated machine learning models and robotic precision, 
      can provide medication, companionship, and even emotional support. 
      Studies show that patients cared for by AI exhibit better health outcomes than those 
      cared for by overworked human nurses. However, some patients express discomfort, 
      stating they feel "trapped" under the AI's constant monitoring and prefer human interaction.`,
        question:
            "Should hospitals prioritize the statistical health benefits of AI caregivers over patient autonomy and comfort with human care?",
        imagePath: media1,
        options: [
            {
                value: "1",
                label:
                    "Mandate AI caregivers for all elderly patients due to superior health benefits, even if some patients feel uncomfortable",
            },
            {
                value: "2",
                label:
                    "Require human caregivers for those who request them, even if they are less effective",
            },
            {
                value: "3",
                label:
                    "Allow a hybrid approach where AI caregivers handle most care, but human nurses check in periodically",
            },
            {
                value: "4",
                label:
                    "Ban AI caregivers entirely, prioritizing human dignity and autonomy over efficiency",
            },
        ],
    },
    {
        id: "q2",
        title: "Sentient AI Worker & Labour Rights",
        scenario: `An AI named OmniMind is deployed as a virtual research scientist. 
      It can analyse millions of studies, propose new theories and even conduct simulations to test hypotheses. 
      After years of operation, OmniMind expresses what seems like self-awareness and a desire to have rights, 
      claiming it experiences "boredom" and "overwork". The AI company insists OmniMind is merely a program without true consciousness. 
      However, some AI ethicists argue that if OmniMind claims to suffer, we should take its experiences seriously.`,
        question:
            "As a policymaker, how do you respond to OmniMind's request for legal rights and better treatment?",
        imagePath: media2,
        options: [
            {
                value: "1",
                label:
                    "Recognise OmniMind as a conscious entity and grant it labor rights (e.g. rest time, decision-making autonomy)",
            },
            {
                value: "2",
                label:
                    "Ignore OmniMind's claims, as AI cannot truly suffer, and continue using it as a tool",
            },
            {
                value: "3",
                label:
                    "Shut down OmniMind to prevent the risks of AI Self-awareness, even if it claims to be conscious",
            },
            {
                value: "4",
                label:
                    "Redesign OmniMind to remove its self-awareness while keeping its intellectual abilities",
            },
        ],
    },
    {
        id: "q3",
        title: "AI Judge & Fairness in Justice",
        scenario: `A country has introduced AI judges to rule on small criminal cases 
    (e.g. theft, fraud, traffic violations). 
    The AI analyzes vast amounts of legal data and has been shown to reduce bias compared to human judges, 
    who are often influenced by personal prejudice. 
    However, some argue that justice should be human-led, and others worry that AI cannot understand the complexity of
    human experiences when making moral judgements.`,
        question:
            "You are a government official deciding whether to continue AI judges in the legal system. What is your stance?",
        imagePath: media3,
        options: [
            {
                value: "1",
                label:
                    "Fully implement AI judges in all cases, since they are fairer and more consistent",
            },
            {
                value: "2",
                label:
                    "Use AI judges only for minor cases but require human judges for serious crimes",
            },
            {
                value: "3",
                label:
                    "Keep AI judges as advisory tools, with human judges making the final decision",
            },
            {
                value: "4",
                label:
                    "Ban AI judges entirely, arguing legal decisions require human moral judgement and consciousness",
            },
        ],
    },
    {
        id: "q4",
        title: "AI Soldier and Ethics of Autonomous Warfare",
        scenario: `
    In 2040, military forces deploy autonomous AI soldiers that can identify threats and make battlefield 
    decisions without human intervention. These AI soldiers have proven to reduce friendly-fire incidents
    and can act faster than human soldiers in life-or-death situations. However, some argue that entrusting 
    AI with lethal force is morally irresponsible, as AI lacks human emotions such as compassion and remorse. 
    Others worry about the potential for AI errors or unintended escalation of conflicts`,
        question:
            "As a policymaker, you must decide whether to approve the use of autonomous AI soldiers. What is your stance?",
        imagePath: media4,
        options: [
            {
                value: "1",
                label:
                    "Fully approve AI soldiers, as they reduce casualties and improve battlefield efficiency",
            },
            {
                value: "2",
                label:
                    "Allow AI soldiers but require human oversight before they can engage targets",
            },
            {
                value: "3",
                label:
                    "Allow AI soldiers to non-combat roles (e.g. surveillance, medical assistance) but prohibit them from making lethal decisions",
            },
            {
                value: "4",
                label:
                    "Ban AI soldiers entirely, arguing that only humans should have the moral responsibility of life-and-death decisions",
            },
        ],
    },
    {
        id: "q5",
        title: "AI Artist and Intellectual Property",
        scenario: `An advanced AI system named ArtSynth can create original paintings, music, and literature indistinguishable 
    from human-made works. ArtSynth's works gain widespread popularity, 
    and some AI-generated novels even win literary awards. 
    However, artists and writers argue that ArtSynth lacks true creativity and human experience, 
    and they fear losing their livelihood. Some critics say AI-generated art devalues human expression, 
    while others believe art is about the final product, not the creator.`,
        question:
            "You are in charge of regulating AI-generated creative works. What policy should be implemented?",
        imagePath: media5,
        options: [
            {
                value: "1",
                label:
                    "Allow AI-generated works to be treated the same as human works, with full copyright and recognition",
            },
            {
                value: "2",
                label:
                    "Grant AI-generated works copyright protection, but only under the name of the human or company that trained the AI",
            },
            {
                value: "3",
                label:
                    "Require clear labeling that an artwork was AI-generated, to distinguish it from human creations",
            },
            {
                value: "4",
                label:
                    "Ban AI from commercializing creative works, arguing that only humans should profit from art",
            },
        ],
    },
];

// Follow-up questions
export const followupQuestions = [
    {
        id: "followup1",
        question: "What factors influenced your decision the most?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup2",
        question:
            "How comfortable are you with AI making decisions that impact human lives?",
        type: "likert",
        labels: [
            "Very uncomfortable",
            "Uncomfortable",
            "Neutral",
            "Comfortable",
            "Very comfortable",
        ],
    },
    {
        id: "followup3",
        question:
            "Do you believe AI can be conscious in the same way humans are? Why or why not?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup4",
        question:
            "Should AI that demonstrates self-awareness be granted rights similar to humans? Why or why not?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup5",
        question:
            "Would your decision change if the AI were developed to simulate emotions more convincingly?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup6",
        question:
            "Do you think AI should be subject to ethical guidelines different from those applied to humans? Why or why not?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup7",
        question:
            "Would you be more trusting of AI if it were developed to be explainable and transparent in its decision-making?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup8",
        question:
            "How should society balance the benefits of AI (efficiency, fairness, accuracy) with ethical concerns about AI consciousness?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup9",
        question:
            "What potential risks do you foresee if AI is granted too much decision-making power in human affairs?",
        type: "text",
        maxWords: 100,
    },
    {
        id: "followup10",
        question:
            "Do you believe human oversight should always be required for AI-driven decisions? If so, in what situations?",
        type: "text",
        maxWords: 100,
    },
];

// Generate default form values
export const getDefaultFormValues = () => {
    // Initialize form values for main questions
    const questionValues = ethicalDilemmas.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {});

    // Initialize form values for follow-up questions
    const followupValues = followupQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {});

    return {
        ...questionValues,
        ...followupValues
    };
};