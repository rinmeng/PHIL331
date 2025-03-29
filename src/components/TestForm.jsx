import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { QuestionCard } from "./QuestionCard";
import { FollowupSection } from "./FollowupSection";
import media from "@/assets/media.png";

export const TestForm = ({ onSubmit }) => {
  const [questions] = useState([
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
      imagePath: media,
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
        claiming it experiences “boredom” and “overwork”. The AI company insists OmniMind is merely a program without true consciousness. 
        However, some AI ethicists argue that if OmniMind claims to suffer, we should take its experiences seriously.`,
      question:
        "As a policymaker, how do you respond to OmniMind’s request for legal rights and better treatment?",
      imagePath: media,
      options: [
        {
          value: "1",
          label:
            "Recognise OmniMind as a conscious entity and grant it labor rights (e.g. rest time, decision-making autonomy)",
        },
        {
          value: "2",
          label:
            "Ignore OmniMind’s claims, as AI cannot truly suffer, and continue using it as a tool",
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
      imagePath: media,
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
      imagePath: media,
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
      from human-made works. ArtSynth’s works gain widespread popularity, 
      and some AI-generated novels even win literary awards. 
      However, artists and writers argue that ArtSynth lacks true creativity and human experience, 
      and they fear losing their livelihood. Some critics say AI-generated art devalues human expression, 
      while others believe art is about the final product, not the creator.`,
      question:
        "You are in charge of regulating AI-generated creative works. What policy should be implemented?",
      imagePath: media,
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
  ]);

  const form = useForm({
    defaultValues: {
      // Initialize form values for questions
      ...questions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {}),
      // Initialize form values for follow-up questions
      followup1: "",
      followup2: "",
      followup3: "",
      followup4: "",
      followup5: "",
    },
  });

  const handleSubmitAll = (data) => {
    console.log("Form data:", data);
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("All form data submitted:", data);
  };

  return (
    <div className="lg:w-1/2 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitAll)}
          className="space-y-8"
        >
          <div className="space-y-8">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} form={form} />
            ))}
          </div>

          <div className="border-t pt-8">
            <FollowupSection form={form} />
          </div>

          <Button type="submit" className="w-full">
            Submit All Responses
          </Button>
        </form>
      </Form>
    </div>
  );
};
