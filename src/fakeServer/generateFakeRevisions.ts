import { sub } from 'date-fns';
import type { RecordRevision } from '@react-admin/ra-history';

import { admins } from './admins';
import type { Data } from './index';
import { Product } from '../types';

const generateFakeRevisions = (data: Data): PartialRevision[] => {
    const products = data.products;

    // get timestamps for today and one month ago
    const today = Date.now();
    const thirtyDaysAgo = sub(new Date(), { days: 30 }).getTime();
    const LoremIpsumText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus nisl ut sagittis euismod. Aenean convallis, lacus sed faucibus ornare, lectus magna consequat leo, at eleifend orci sem sed est. In rhoncus, sapien vel rutrum placerat, diam ante consequat enim, vitae dapibus sem nisi aliquam risus. Sed porta porttitor nibh eu aliquam. Sed eu tincidunt justo. Donec pulvinar, metus vel ultrices lobortis, nunc massa pharetra nulla, vitae tristique purus ante pellentesque mauris. Aenean scelerisque, quam sed molestie finibus, erat mauris blandit risus, a laoreet est sem in nisl. Donec hendrerit lacus ligula, et pharetra turpis facilisis vitae. Aenean quis augue malesuada, hendrerit diam eget, consequat felis. Quisque dignissim efficitur convallis. Nullam ac risus molestie, dictum dui eget, sagittis risus. Pellentesque sed velit velit. Praesent nec ipsum et sem faucibus placerat. Curabitur quis consequat augue. Aenean luctus velit eros, non feugiat augue suscipit a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus bibendum erat vitae efficitur tristique. Fusce pretium tellus tempor pulvinar placerat. Integer viverra nisl justo, a varius tortor vulputate ac. Sed interdum eros magna, quis tristique tellus varius non. Nullam nec ipsum eu sem fermentum ultricies. Aliquam et purus risus. Mauris ornare in turpis vitae vestibulum. Cras facilisis tincidunt nisl, et ultricies nisi commodo ut. Duis in nisl arcu. Donec non placerat mi. Suspendisse sodales nec dui ac scelerisque. Cras quis pretium sem. Duis fermentum diam nunc, quis sodales sem vestibulum pellentesque. Duis diam purus, sollicitudin ut malesuada sed, dignissim ut eros. Integer aliquet est tortor, id rutrum nibh aliquet sed. Aenean posuere nisl sed justo placerat suscipit. Donec elementum lobortis neque, eget lacinia enim porta eget. Duis blandit a lacus facilisis sagittis. Etiam pellentesque sit amet nibh ac vestibulum. Nulla eu rhoncus lacus, id eleifend felis. Suspendisse non faucibus enim. Ut eleifend dolor eget venenatis viverra. Pellentesque pretium sagittis quam, in faucibus odio congue ut. Cras bibendum enim felis, vel auctor massa ultrices egestas. Aliquam accumsan mattis magna eu sodales. Donec hendrerit nisi leo, id tempus leo iaculis sed. In vel orci quis dolor interdum faucibus et porta diam. In hac habitasse platea dictumst. Vestibulum tempor velit risus, eget egestas mauris volutpat id. Pellentesque pretium sapien sit amet pellentesque sagittis. Maecenas aliquam, risus ut pharetra placerat, sapien orci commodo erat, id sollicitudin nulla quam quis arcu. Etiam aliquet feugiat sapien non sodales. Vestibulum in nisi accumsan mauris dignissim tempor vitae vitae lorem. Quisque nulla velit, vehicula et nulla non, tincidunt varius eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sed leo turpis. Fusce lectus arcu, gravida eu sodales quis, mattis vel neque. Duis blandit a orci quis scelerisque. Mauris eu faucibus metus, egestas interdum orci. Fusce pulvinar, risus tristique lobortis molestie, eros purus aliquam tellus, in feugiat nisl mauris sed justo. Nulla et purus massa. Integer euismod nibh in ullamcorper aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin lorem sapien, elementum blandit ex interdum sit amet. Aliquam lacus erat, lacinia eget dui nec, ultricies ultricies augue. Nulla scelerisque, nulla sit amet dictum cursus, ligula est convallis diam, et fringilla metus velit nec erat. Phasellus ac augue ac arcu consectetur semper. Nunc felis risus, porta sit amet ex vel, pretium fermentum est. Mauris tempor sed lacus vitae venenatis. Nam ac tellus fringilla, convallis leo in, iaculis libero. Mauris porttitor, dolor non volutpat sollicitudin, nisl lectus imperdiet sem, et efficitur mi erat eget orci. Sed nec quam tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mollis ornare nisi. Donec interdum ante tempor, porttitor nulla non, iaculis erat. Mauris convallis rutrum aliquet. Nunc ac erat purus. Vivamus vehicula eu enim nec rutrum. Proin porttitor sem nec ante porta, ut pretium nisl ornare. Vestibulum nec tellus eu justo porttitor laoreet a vel nisi. Vivamus egestas, tellus in dapibus tristique, justo ipsum mollis massa, sit amet dictum nisi dolor vel mi. Nullam vel sapien ultrices, interdum dolor quis, viverra ante. Morbi ac dignissim quam. Fusce cursus, arcu feugiat facilisis tempus, diam sem sollicitudin augue, vel viverra nunc massa sed augue. Donec id dignissim erat. Praesent eget faucibus ipsum, id porta lacus. Pellentesque tincidunt odio elit, aliquam dapibus magna egestas eu. Morbi facilisis, felis non sagittis condimentum, urna leo placerat turpis, et sagittis turpis elit in turpis. Mauris porta libero vel nisl cursus aliquam. Quisque tempus purus ac lobortis porta. In eget neque elit. Aliquam sit amet ullamcorper ligula. Aliquam sed ligula varius, euismod velit eu, fringilla quam. Sed mattis vulputate mi vitae tempus. Sed ut fermentum augue. Duis nec eros nec nibh tempor lacinia. Cras tristique dignissim ex in euismod. Suspendisse potenti. Aenean ullamcorper lacus ultrices, bibendum odio vel, imperdiet lorem. In convallis orci sit amet neque dictum, placerat gravida diam posuere. Nam vitae neque dolor. Nunc pharetra massa sit amet aliquet mattis. Maecenas pellentesque turpis a accumsan cursus. Sed dignissim rhoncus odio, a scelerisque augue ultrices in. Ut turpis metus, ornare sed justo vel, tincidunt rutrum felis. Suspendisse molestie eget sem accumsan tincidunt. Praesent volutpat convallis mattis. Vivamus fringilla libero ut ante facilisis, ac iaculis arcu euismod. Duis elit purus, cursus id massa in, tincidunt dapibus lacus. Cras dapibus odio ac commodo tincidunt. Nullam a velit tristique, posuere urna at, porta lacus. Aenean quis viverra turpis. Sed nec iaculis sapien. Nulla malesuada sem sed justo faucibus condimentum. Fusce tincidunt ut nulla a fringilla. Sed magna nibh, malesuada vel venenatis feugiat, dignissim at turpis. Sed et bibendum lorem, quis rhoncus lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum, diam non porta luctus, nisi metus porta massa, nec finibus sem leo vel turpis. Aliquam tempus sodales lectus, quis fermentum ipsum egestas eu. Aenean cursus mi lacus, sed ullamcorper nisi ullamcorper sit amet. Nam vel aliquam ante, sed convallis nibh. Sed in feugiat nisl. Sed hendrerit metus sollicitudin sem aliquet congue a mattis eros. Proin vitae dolor vel est aliquam scelerisque. Sed auctor vehicula leo dignissim maximus. Etiam egestas, nunc viverra lobortis efficitur, nunc ante congue nisi, id sodales ligula tortor ac lectus. Nulla vitae rhoncus sapien. Donec in finibus odio. Cras eu tincidunt leo, eget rhoncus ipsum. Vestibulum malesuada elementum nunc vitae fermentum. Maecenas at pretium eros, in semper massa. Mauris sodales tortor sit amet dolor laoreet, in dignissim libero mollis. Praesent id urna ante. Mauris lobortis nec tellus id condimentum. Ut rhoncus posuere massa, ut congue tortor dignissim nec. Aliquam eleifend dolor varius est malesuada blandit. Praesent mollis nibh quis leo molestie vehicula.';
    const sentences = LoremIpsumText.split('.').map(sentence =>
        sentence.trim()
    );

    let revisionIndex = 0;
    const revisions: PartialRevision[] = [];

    // create the last revision for each product
    products.forEach(product => {
        const lastRevision: PartialRevision = {
            id: revisionIndex++,
            recordId: product.id,
            // date: a random date in the past 30 days
            date: new Date(
                thirtyDaysAgo +
                    Math.floor(Math.random() * (today - thirtyDaysAgo))
            ).toISOString(),
            message: 'Initial Revision',
            description: '',
            authorId: admins[Math.floor(Math.random() * admins.length)].id,
            data: { ...product },
        };
        revisions.push(lastRevision);
    });

    const randomChanges = {
        stock: (value: number) => value + Math.floor(Math.random() * 10 - 5),
        sales: (value: number) => value + Math.floor(Math.random() * 10 - 5),
        price: (value: number) => value + Math.random() * 5 - 2,
        description: () =>
            sentences[Math.floor(Math.random() * sentences.length)],
    };

    // for each product, create between 0 and 5 additional revisions
    products.forEach(product => {
        const numberOfRevisions = Math.floor(Math.random() * 5);
        for (let i = 0; i < numberOfRevisions; i++) {
            const previousRevisions = revisions.filter(
                revision => revision.recordId === product.id
            );
            const previousRevision =
                previousRevisions[previousRevisions.length - 1];
            const newRevision: PartialRevision = {
                ...previousRevision,
                data: { ...previousRevision.data } as Product, // because shallow copy is not enough
                id: revisionIndex++,
                // date: a random date between the previous revision date and one month ago
                date: new Date(
                    new Date(previousRevision.date).getTime() +
                        Math.floor(
                            Math.random() *
                                (thirtyDaysAgo -
                                    new Date(previousRevision.date).getTime())
                        )
                ).toISOString(),
                message: 'Initial revision',
                authorId: admins[Math.floor(Math.random() * admins.length)].id,
            };
            // change a random property
            const randomProperty =
                Object.keys(randomChanges)[
                    Math.floor(
                        Math.random() * Object.keys(randomChanges).length
                    )
                ];
            // @ts-ignore
            newRevision.data[randomProperty] = randomChanges[randomProperty](
                newRevision.data[randomProperty]
            );
            previousRevision.message = `Changed ${randomProperty}`;
            revisions.push(newRevision);
        }
    });

    return revisions;
};

type PartialRevision = Omit<RecordRevision, 'resource'>;

export default generateFakeRevisions;
