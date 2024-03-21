import AppCard from "@/components/molecules/Integrations/AppCard";
import AppContainer from "@/components/molecules/Integrations/AppContainer";
import { allApps } from "@/constants/integrations";

const Integrations = () => {
  return (
    <div className="w-full flex justify-start p-5 flex-col gap-10">
      <div>
        <p className="text-xl font-semibold mb-3">Configured Apps</p>
        <AppContainer>
          {allApps
            .filter((app) => app.status === true)
            .map((app, index) => (
              <AppCard
                key={index}
                imageURL={app.image}
                alt={app.alt}
                name={app.name}
                url={``}
                status={app.status}
              />
            ))}
        </AppContainer>
      </div>
      <div>
        <p className="text-xl font-semibold mb-3">Available Apps</p>
        <AppContainer>
          {allApps
            .filter((app) => app.status !== true)
            .map((app, index) => (
              <AppCard
                key={index}
                imageURL={app.image}
                alt={app.alt}
                name={app.name}
                url={`/integrations/app?app=${encodeURIComponent(app.name)}`}
                status={app.status}
              />
            ))}
        </AppContainer>
      </div>
    </div>
  );
};

export default Integrations;