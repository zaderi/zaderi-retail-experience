<div className="flex flex-col gap-1.5 mb-6">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Message</label>
            <textarea
              placeholder="Tell us more..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full gradient-primary text-foreground py-3.5 rounded-lg font-semibold text-[0.9rem] shadow-glow transition-all"
          >
            {submitted ? "✓ Message Sent!" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </div> {/* This was missing */}
  </section>
  );
};

export default ContactSection;
