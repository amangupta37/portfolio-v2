import { MacbookScroll } from "@/components/ui/macbook-scroll";

const PersonalBranding = () => {
  return (
    <section className="w-full overflow-hidden bg-black">
      <MacbookScroll
        title={
          <span>
            Building in public, <br /> one commit at a time.
          </span>
        }
        src="/MyProfile.png"
        showGradient={false}
      />
    </section>
  );
};

export default PersonalBranding;
