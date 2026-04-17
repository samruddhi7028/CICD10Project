import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Category,
  DietaryTag,
  Difficulty,
  useSubmitContact,
  useSubmitRecipe,
} from "../hooks/useRecipes";
import { categoryLabel, dietaryTagLabel, difficultyLabel } from "../lib/utils";

type TabId = "contact" | "recipe";

// ─── Validation helpers ──────────────────────────────────────────────────────
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// ─── Contact form ─────────────────────────────────────────────────────────────
interface ContactErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateContact(
  name: string,
  email: string,
  subject: string,
  message: string,
): ContactErrors {
  const e: ContactErrors = {};
  if (!name.trim()) e.name = "Name is required";
  if (!email.trim()) e.email = "Email is required";
  else if (!isValidEmail(email)) e.email = "Enter a valid email address";
  if (!subject.trim()) e.subject = "Subject is required";
  if (!message.trim()) e.message = "Message is required";
  return e;
}

function ContactForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const submitContact = useSubmitContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function touch(field: string) {
    setTouched((prev) => new Set(prev).add(field));
  }

  function fieldError(field: keyof ContactErrors) {
    return touched.has(field) ? errors[field] : undefined;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // touch all fields to show errors
    setTouched(new Set(["name", "email", "subject", "message"]));
    const v = validateContact(name, email, subject, message);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      const result = await submitContact.mutateAsync({
        name,
        email,
        subject,
        message,
      });
      if ((result as { __kind__?: string }).__kind__ === "ok") {
        toast.success("Message sent! We'll be in touch soon.");
        onSuccess();
      } else {
        toast.error(
          (result as { err?: string }).err ?? "Something went wrong.",
        );
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="contact.contact_form"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="c-name" className="font-body text-sm">
            Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="c-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.has("name"))
                setErrors((p) => ({
                  ...p,
                  ...validateContact(e.target.value, email, subject, message),
                }));
            }}
            onBlur={() => {
              touch("name");
              setErrors((p) => ({
                ...p,
                ...validateContact(name, email, subject, message),
              }));
            }}
            placeholder="Your name"
            className={
              fieldError("name")
                ? "border-destructive focus-visible:ring-destructive/40"
                : ""
            }
            data-ocid="contact.name_input"
          />
          {fieldError("name") && (
            <p
              className="text-xs text-destructive"
              data-ocid="contact.name.field_error"
            >
              {fieldError("name")}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="c-email" className="font-body text-sm">
            Email <span className="text-primary">*</span>
          </Label>
          <Input
            id="c-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.has("email"))
                setErrors((p) => ({
                  ...p,
                  ...validateContact(name, e.target.value, subject, message),
                }));
            }}
            onBlur={() => {
              touch("email");
              setErrors((p) => ({
                ...p,
                ...validateContact(name, email, subject, message),
              }));
            }}
            placeholder="you@example.com"
            className={
              fieldError("email")
                ? "border-destructive focus-visible:ring-destructive/40"
                : ""
            }
            data-ocid="contact.email_input"
          />
          {fieldError("email") && (
            <p
              className="text-xs text-destructive"
              data-ocid="contact.email.field_error"
            >
              {fieldError("email")}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <Label htmlFor="c-subject" className="font-body text-sm">
          Subject <span className="text-primary">*</span>
        </Label>
        <Input
          id="c-subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (touched.has("subject"))
              setErrors((p) => ({
                ...p,
                ...validateContact(name, email, e.target.value, message),
              }));
          }}
          onBlur={() => {
            touch("subject");
            setErrors((p) => ({
              ...p,
              ...validateContact(name, email, subject, message),
            }));
          }}
          placeholder="What's on your mind?"
          className={
            fieldError("subject")
              ? "border-destructive focus-visible:ring-destructive/40"
              : ""
          }
          data-ocid="contact.subject_input"
        />
        {fieldError("subject") && (
          <p
            className="text-xs text-destructive"
            data-ocid="contact.subject.field_error"
          >
            {fieldError("subject")}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="c-message" className="font-body text-sm">
          Message <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="c-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (touched.has("message"))
              setErrors((p) => ({
                ...p,
                ...validateContact(name, email, subject, e.target.value),
              }));
          }}
          onBlur={() => {
            touch("message");
            setErrors((p) => ({
              ...p,
              ...validateContact(name, email, subject, message),
            }));
          }}
          rows={5}
          placeholder="Your message..."
          className={
            fieldError("message")
              ? "border-destructive focus-visible:ring-destructive/40"
              : ""
          }
          data-ocid="contact.message_textarea"
        />
        {fieldError("message") && (
          <p
            className="text-xs text-destructive"
            data-ocid="contact.message.field_error"
          >
            {fieldError("message")}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitContact.isPending}
        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 border-0 gap-2"
        data-ocid="contact.send_message_button"
      >
        {submitContact.isPending ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-accent-foreground/50 border-t-accent-foreground animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Mail size={14} />
            Send Message
          </>
        )}
      </Button>
    </motion.form>
  );
}

// ─── Recipe submission form ───────────────────────────────────────────────────
interface RecipeErrors {
  name?: string;
  email?: string;
  recipeName?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients?: string;
  instructions?: string;
}

function validateRecipeFields(fields: {
  name: string;
  email: string;
  recipeName: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  instructions: string;
}): RecipeErrors {
  const e: RecipeErrors = {};
  if (!fields.name.trim()) e.name = "Your name is required";
  if (!fields.email.trim()) e.email = "Your email is required";
  else if (!isValidEmail(fields.email)) e.email = "Enter a valid email address";
  if (!fields.recipeName.trim()) e.recipeName = "Recipe name is required";
  const prep = Number.parseInt(fields.prepTime, 10);
  if (!fields.prepTime || Number.isNaN(prep) || prep <= 0)
    e.prepTime = "Enter a positive number of minutes";
  const cook = Number.parseInt(fields.cookTime, 10);
  if (!fields.cookTime || Number.isNaN(cook) || cook <= 0)
    e.cookTime = "Enter a positive number of minutes";
  if (!fields.ingredients.trim()) e.ingredients = "Ingredients are required";
  if (!fields.instructions.trim()) e.instructions = "Instructions are required";
  return e;
}

function RecipeSubmitForm({ onSuccess }: { onSuccess: () => void }) {
  const submitRecipe = useSubmitRecipe();

  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rRecipeName, setRRecipeName] = useState("");
  const [rCategory, setRCategory] = useState<Category>(Category.Dinner);
  const [rDifficulty, setRDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [rIngredients, setRIngredients] = useState("");
  const [rInstructions, setRInstructions] = useState("");
  const [rDietaryTags, setRDietaryTags] = useState<DietaryTag[]>([]);
  const [rPrepTime, setRPrepTime] = useState("");
  const [rCookTime, setRCookTime] = useState("");
  const [errors, setErrors] = useState<RecipeErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function touch(field: string) {
    setTouched((prev) => new Set(prev).add(field));
  }

  function fieldError(field: keyof RecipeErrors) {
    return touched.has(field) ? errors[field] : undefined;
  }

  function getFields() {
    return {
      name: rName,
      email: rEmail,
      recipeName: rRecipeName,
      prepTime: rPrepTime,
      cookTime: rCookTime,
      ingredients: rIngredients,
      instructions: rInstructions,
    };
  }

  function toggleDietaryTag(tag: DietaryTag) {
    setRDietaryTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(
      new Set([
        "name",
        "email",
        "recipeName",
        "prepTime",
        "cookTime",
        "ingredients",
        "instructions",
      ]),
    );
    const v = validateRecipeFields(getFields());
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      const result = await submitRecipe.mutateAsync({
        name: rName,
        email: rEmail,
        recipeName: rRecipeName,
        category: rCategory,
        ingredients: rIngredients,
        instructions: rInstructions,
        difficulty: rDifficulty,
        dietaryTags: rDietaryTags,
        prepTime: BigInt(Number.parseInt(rPrepTime, 10)),
        cookTime: BigInt(Number.parseInt(rCookTime, 10)),
      });
      if ((result as { __kind__?: string }).__kind__ === "ok") {
        toast.success("Recipe submitted! We'll review it shortly.");
        onSuccess();
      } else {
        toast.error(
          (result as { err?: string }).err ?? "Something went wrong.",
        );
      }
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="contact.recipe_form"
      noValidate
    >
      {/* Author name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="r-name" className="font-body text-sm">
            Your Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="r-name"
            value={rName}
            onChange={(e) => {
              setRName(e.target.value);
              if (touched.has("name"))
                setErrors((p) => ({
                  ...p,
                  ...validateRecipeFields({
                    ...getFields(),
                    name: e.target.value,
                  }),
                }));
            }}
            onBlur={() => {
              touch("name");
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields(getFields()),
              }));
            }}
            placeholder="Your name"
            className={
              fieldError("name")
                ? "border-destructive focus-visible:ring-destructive/40"
                : ""
            }
            data-ocid="contact.recipe_author_input"
          />
          {fieldError("name") && (
            <p
              className="text-xs text-destructive"
              data-ocid="contact.recipe_name.field_error"
            >
              {fieldError("name")}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-email" className="font-body text-sm">
            Your Email <span className="text-primary">*</span>
          </Label>
          <Input
            id="r-email"
            type="email"
            value={rEmail}
            onChange={(e) => {
              setREmail(e.target.value);
              if (touched.has("email"))
                setErrors((p) => ({
                  ...p,
                  ...validateRecipeFields({
                    ...getFields(),
                    email: e.target.value,
                  }),
                }));
            }}
            onBlur={() => {
              touch("email");
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields(getFields()),
              }));
            }}
            placeholder="you@example.com"
            className={
              fieldError("email")
                ? "border-destructive focus-visible:ring-destructive/40"
                : ""
            }
            data-ocid="contact.recipe_email_input"
          />
          {fieldError("email") && (
            <p
              className="text-xs text-destructive"
              data-ocid="contact.recipe_email.field_error"
            >
              {fieldError("email")}
            </p>
          )}
        </div>
      </div>

      {/* Recipe name */}
      <div className="space-y-1.5">
        <Label htmlFor="r-recipe-name" className="font-body text-sm">
          Recipe Name <span className="text-primary">*</span>
        </Label>
        <Input
          id="r-recipe-name"
          value={rRecipeName}
          onChange={(e) => {
            setRRecipeName(e.target.value);
            if (touched.has("recipeName"))
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields({
                  ...getFields(),
                  recipeName: e.target.value,
                }),
              }));
          }}
          onBlur={() => {
            touch("recipeName");
            setErrors((p) => ({ ...p, ...validateRecipeFields(getFields()) }));
          }}
          placeholder="e.g. Grandma's Lasagna"
          className={
            fieldError("recipeName")
              ? "border-destructive focus-visible:ring-destructive/40"
              : ""
          }
          data-ocid="contact.recipe_name_input"
        />
        {fieldError("recipeName") && (
          <p
            className="text-xs text-destructive"
            data-ocid="contact.recipe_recipeName.field_error"
          >
            {fieldError("recipeName")}
          </p>
        )}
      </div>

      {/* Category + Difficulty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="font-body text-sm">
            Category <span className="text-primary">*</span>
          </Label>
          <Select
            value={rCategory}
            onValueChange={(v) => setRCategory(v as Category)}
          >
            <SelectTrigger
              className="font-body"
              data-ocid="contact.recipe_category_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Category).map((cat) => (
                <SelectItem key={cat} value={cat} className="font-body">
                  {categoryLabel(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-sm">
            Difficulty <span className="text-primary">*</span>
          </Label>
          <Select
            value={rDifficulty}
            onValueChange={(v) => setRDifficulty(v as Difficulty)}
          >
            <SelectTrigger
              className="font-body"
              data-ocid="contact.recipe_difficulty_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Difficulty).map((diff) => (
                <SelectItem key={diff} value={diff} className="font-body">
                  {difficultyLabel(diff)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Prep + Cook time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="r-prep" className="font-body text-sm">
            Prep Time (minutes) <span className="text-primary">*</span>
          </Label>
          <Input
            id="r-prep"
            type="number"
            min="1"
            value={rPrepTime}
            onChange={(e) => {
              setRPrepTime(e.target.value);
              if (touched.has("prepTime"))
                setErrors((p) => ({
                  ...p,
                  ...validateRecipeFields({
                    ...getFields(),
                    prepTime: e.target.value,
                  }),
                }));
            }}
            onBlur={() => {
              touch("prepTime");
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields(getFields()),
              }));
            }}
            placeholder="15"
            className={
              fieldError("prepTime")
                ? "border-destructive focus-visible:ring-destructive/40"
                : ""
            }
            data-ocid="contact.recipe_prep_time_input"
          />
          {fieldError("prepTime") && (
            <p
              className="text-xs text-destructive"
              data-ocid="contact.recipe_prepTime.field_error"
            >
              {fieldError("prepTime")}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-cook" className="font-body text-sm">
            Cook Time (minutes) <span className="text-primary">*</span>
          </Label>
          <Input
            id="r-cook"
            type="number"
            min="1"
            value={rCookTime}
            onChange={(e) => {
              setRCookTime(e.target.value);
              if (touched.has("cookTime"))
                setErrors((p) => ({
                  ...p,
                  ...validateRecipeFields({
                    ...getFields(),
                    cookTime: e.target.value,
                  }),
                }));
            }}
            onBlur={() => {
              touch("cookTime");
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields(getFields()),
              }));
            }}
            placeholder="30"
            className={
              fieldError("cookTime")
                ? "border-destructive focus-visible:ring-destructive/40"
                : ""
            }
            data-ocid="contact.recipe_cook_time_input"
          />
          {fieldError("cookTime") && (
            <p
              className="text-xs text-destructive"
              data-ocid="contact.recipe_cookTime.field_error"
            >
              {fieldError("cookTime")}
            </p>
          )}
        </div>
      </div>

      {/* Dietary tags */}
      <div className="space-y-2">
        <p className="font-body text-sm font-medium">Dietary Tags</p>
        <div className="flex flex-wrap gap-3">
          {Object.values(DietaryTag).map((tag) => (
            <button
              type="button"
              key={tag}
              className="flex items-center gap-2"
              onClick={() => toggleDietaryTag(tag)}
            >
              <Checkbox
                checked={rDietaryTags.includes(tag)}
                onCheckedChange={() => toggleDietaryTag(tag)}
                data-ocid={`contact.dietary_${tag.toLowerCase()}_checkbox`}
                aria-label={dietaryTagLabel(tag)}
              />
              <Badge
                variant="outline"
                className="font-body text-xs cursor-pointer"
              >
                {dietaryTagLabel(tag)}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className="space-y-1.5">
        <Label htmlFor="r-ingredients" className="font-body text-sm">
          Ingredients <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="r-ingredients"
          value={rIngredients}
          onChange={(e) => {
            setRIngredients(e.target.value);
            if (touched.has("ingredients"))
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields({
                  ...getFields(),
                  ingredients: e.target.value,
                }),
              }));
          }}
          onBlur={() => {
            touch("ingredients");
            setErrors((p) => ({ ...p, ...validateRecipeFields(getFields()) }));
          }}
          rows={4}
          placeholder={"2 cups flour\n1 tsp salt\n3 large eggs"}
          className={
            fieldError("ingredients")
              ? "border-destructive focus-visible:ring-destructive/40"
              : ""
          }
          data-ocid="contact.recipe_ingredients_textarea"
        />
        <p className="font-body text-xs text-muted-foreground">
          One ingredient per line with quantity
        </p>
        {fieldError("ingredients") && (
          <p
            className="text-xs text-destructive"
            data-ocid="contact.recipe_ingredients.field_error"
          >
            {fieldError("ingredients")}
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="space-y-1.5">
        <Label htmlFor="r-instructions" className="font-body text-sm">
          Instructions <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="r-instructions"
          value={rInstructions}
          onChange={(e) => {
            setRInstructions(e.target.value);
            if (touched.has("instructions"))
              setErrors((p) => ({
                ...p,
                ...validateRecipeFields({
                  ...getFields(),
                  instructions: e.target.value,
                }),
              }));
          }}
          onBlur={() => {
            touch("instructions");
            setErrors((p) => ({ ...p, ...validateRecipeFields(getFields()) }));
          }}
          rows={5}
          placeholder={
            "1. Preheat oven to 350°F\n2. Mix dry ingredients in a large bowl\n3. Add wet ingredients and stir until smooth"
          }
          className={
            fieldError("instructions")
              ? "border-destructive focus-visible:ring-destructive/40"
              : ""
          }
          data-ocid="contact.recipe_instructions_textarea"
        />
        {fieldError("instructions") && (
          <p
            className="text-xs text-destructive"
            data-ocid="contact.recipe_instructions.field_error"
          >
            {fieldError("instructions")}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitRecipe.isPending}
        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 border-0 gap-2"
        data-ocid="contact.submit_recipe_button"
      >
        {submitRecipe.isPending ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/50 border-t-primary-foreground animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send size={14} />
            Submit Recipe
          </>
        )}
      </Button>
    </motion.form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [activeTab, setActiveTab] = useState<TabId>("contact");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

  return (
    <div data-ocid="contact.page">
      {/* Page header */}
      <div className="bg-card border-b border-border py-10">
        <div className="container mx-auto px-4">
          <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Get in touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Contact Us
          </h1>
          <p className="font-body text-muted-foreground mt-2 max-w-md">
            Have a question, a story to share, or a recipe you'd love to see
            featured?
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Tabs */}
        <div className="flex gap-1 bg-muted/40 p-1 rounded mb-8 border border-border">
          {(["contact", "recipe"] as TabId[]).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-ocid={`contact.${tab}_tab`}
              className={[
                "flex-1 py-2 text-sm font-body font-medium rounded transition-smooth",
                activeTab === tab
                  ? "bg-card shadow-xs text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {tab === "contact" ? "Send a Message" : "Submit a Recipe"}
            </button>
          ))}
        </div>

        {/* Contact tab content */}
        {activeTab === "contact" &&
          (contactSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
              data-ocid="contact.success_state"
            >
              <CheckCircle size={48} className="mx-auto text-secondary mb-4" />
              <h2 className="font-display text-2xl text-foreground">
                Message received!
              </h2>
              <p className="font-body text-muted-foreground mt-2">
                We'll get back to you within 24–48 hours.
              </p>
            </motion.div>
          ) : (
            <ContactForm onSuccess={() => setContactSubmitted(true)} />
          ))}

        {/* Recipe tab content */}
        {activeTab === "recipe" &&
          (recipeSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
              data-ocid="contact.recipe_success_state"
            >
              <CheckCircle size={48} className="mx-auto text-secondary mb-4" />
              <h2 className="font-display text-2xl text-foreground">
                Recipe submitted!
              </h2>
              <p className="font-body text-muted-foreground mt-2">
                Thank you! Our team will review it and get in touch.
              </p>
            </motion.div>
          ) : (
            <RecipeSubmitForm onSuccess={() => setRecipeSubmitted(true)} />
          ))}
      </div>
    </div>
  );
}
