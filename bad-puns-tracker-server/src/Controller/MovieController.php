<?php
namespace App\Controller;

use App\Entity\Movie;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class MovieController extends ApiController
{
    /**
     * @Route("/movies", methods="GET")
     * @param MovieRepository $movieRepository
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function index(MovieRepository $movieRepository)
    {
        $movies = $movieRepository->transformAll();

        return $this->respond($movies);
    }

    /**
     * @Route("/movies", methods="POST")
     * @param Request $request
     * @param MovieRepository $movieRepository
     * @param EntityManagerInterface $em
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function create(Request $request, MovieRepository $movieRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);

        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the title
        if (! $request->get('title')) {
            return $this->respondValidationError('Please provide a title!');
        }

        // persist the new movie
        $movie = new Movie;
        $movie->setTitle($request->get('title'));
        $movie->setCount(0);
        $em->persist($movie);
        $em->flush();

        return $this->respondCreated($movieRepository->transform($movie));
    }

    /**
     * @Route("/movies/{id}/count", methods="POST")
     * @param $id
     * @param EntityManagerInterface $em
     * @param MovieRepository $movieRepository
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function increaseCount($id, EntityManagerInterface $em, MovieRepository $movieRepository)
    {
        /** @var Movie $movie */
        $movie = $movieRepository->find($id);

        if (! $movie) {
            return $this->respondNotFound();
        }

        $movie->setCount($movie->getCount() + 1);
        $em->persist($movie);
        $em->flush();

        return $this->respond([
            'count' => $movie->getCount()
        ]);
    }

}