import GooeyNav from '@/components/Components_Esteticos/GooeyNav';

interface NavItem {
    label: string;
    href: string;
}

const items: NavItem[] = [
    { label: "Principal", href: "#principal" },
    { label: "Sobre mim", href: "#sobremim" },
    { label: "Prinipais Projetos", href: "#principaisprojetos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
];

export function Navbar() {
    return (
        <div>
            <div className="fixed top-0 mt-4 left-0 right-0 flex justify-start items-start z-[999]">
                <GooeyNav
                    items={items}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
            </div>
        </div>
    );
}